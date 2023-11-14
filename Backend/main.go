package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func mongoDBConnect() (*mongo.Client, error) {
	mongodbURI := os.Getenv("MONGODB_URI")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodbURI))
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}

	// Create a unique index on the 'nic' field in the patients collection
	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{"nic", 1}, // 1 represents ascending order, -1 for descending order
		},
		Options: options.Index().SetUnique(true),
	}

	collection := client.Database("PatientDB").Collection("patients")

	// Create the unique index on the 'nic' field
	_, createErr := collection.Indexes().CreateOne(context.TODO(), indexModel)
	if createErr != nil {
		log.Fatal(createErr)
	}

	fmt.Println("Connected to MongoDB!")

	return client, nil
}

type Patient struct {
	Name              string    `json:"name"`
	Address           string    `json:"address"`
	Email             string    `json:"email"`
	NIC               string    `json:"nic"`
	Occupation        string    `json:"occupation"`
	Consultant        string    `json:"consultant"`
	Gender            string    `json:"gender"`
	Age               string    `json:"age"`
	DOB               time.Time `json:"dob"`
	BloodGroup        string    `json:"bloodgroup"`
	Mobile            int       `json:"mobile"`
	Home              int       `json:"home"`
	InsuranceCompany  string    `json:"insurancecompany"`
	InsurancePolicyNo string    `json:"insurancepolicyno"`
	MedicalCondition  string    `json:"medicalcondition"`
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	client, err := mongoDBConnect()
	if err != nil {
		log.Fatal("Error connecting to MongoDB:", err)
		return
	}
	defer client.Disconnect(context.TODO())

	collection := client.Database("PatientDB").Collection("patients")

	app := fiber.New()
	app.Use(cors.New())



	app.Post("/patients/new", func(c *fiber.Ctx) error {

		var patientInput Patient
		if err := c.BodyParser(&patientInput); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err,
			})
		}

		patient := Patient{
			Name:              patientInput.Name,
			Address:           patientInput.Address,
			Email:             patientInput.Email,
			NIC:               patientInput.NIC,
			Occupation:        patientInput.Occupation,
			Consultant:        patientInput.Consultant,
			Gender:            patientInput.Gender,
			Age:               patientInput.Age,
			DOB:               patientInput.DOB,
			BloodGroup:        patientInput.BloodGroup,
			Mobile:            patientInput.Mobile,
			Home:              patientInput.Home,
			InsuranceCompany:  patientInput.InsuranceCompany,
			InsurancePolicyNo: patientInput.InsurancePolicyNo,
			MedicalCondition:  patientInput.MedicalCondition,
		}

		_, err := collection.InsertOne(context.TODO(), patient)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to Register. patient may already exist!",
			})
		}

		// Respond with a success message
		return c.JSON(fiber.Map{
			"message": "Patient Added successfully",
		})

	})

	app.Get("/patients/", func(c *fiber.Ctx) error {

		queryParam := c.Query("search")
		cursor, err := collection.Find(context.TODO(), bson.M{
			"$or": []bson.M{
				bson.M{"mobile": queryParam},
				bson.M{"nic": queryParam},
				bson.M{"name": bson.M{"$regex": queryParam, "$options": "i"}},
			},
		})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to get patient data",
			})
		}
		defer cursor.Close(context.TODO())

		var patients []Patient
		for cursor.Next(context.TODO()) {
			var patient Patient
			if err := cursor.Decode(&patient); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": "error with patient data",
				})
			}
			patients = append(patients, patient)
		}

		if err := cursor.Err(); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to get patient data",
			})
		}

		return c.JSON(patients)
	})

	log.Fatal(app.Listen(":4000"))

}
