import { useState, useEffect } from "react";
import { useAddPatientMutation, useGetPatientsMutation } from '../api/patientsApi';
import { Box, Button, Card, LinearProgress, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Search } from '@mui/icons-material'
import { Container, Row, Col, FloatingLabel, Form, Carousel } from 'react-bootstrap'
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { toast } from 'react-toastify';


const HomePage = () => {

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [nic, setNIC] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [consultant, setConsultant] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDOB] = useState(' ');
    const [blood, setBlood] = useState('');
    const [mobile, setMobile] = useState('');
    const [homeNo, setHomeNo] = useState('');
    const [insuranceCompany, setInsuranceCompany] = useState('');
    const [iPolicyNo, setIPolicyNo] = useState('');
    const [medicalCondition, setMedicalCondition] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const [patients, setPatients] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);


    const [addPatient, {isLoading}] = useAddPatientMutation();
    const [getPatients] = useGetPatientsMutation();

    useEffect(() => {
        
    },[]);

    const handleDOBChange = (dob) => {
        const today = new Date();
        const dobDate = new Date(dob);
      
        const years = differenceInYears(today, dobDate);
        const months = differenceInMonths(today, dobDate);
        const days = differenceInDays(today, dobDate);
      
        let ageString = '';
      
        if (years > 0) {
          ageString = `${years} ${years === 1 ? 'year' : 'years'}`;
        } else if (months > 0) {
          ageString = `${months} ${months === 1 ? 'month' : 'months'}`;
        } else {
          ageString = `${days} ${days === 1 ? 'day' : 'days'}`;
        }
      
        setDOB(dob);
        setAge(ageString);
    };

    const submitHandler = async(e) => {
        e.preventDefault();

        if(!gender){
            toast.error("Please select a gender")
        }
        else if(differenceInDays(new Date(), new Date(dob)) <= 0){
            toast.error("Please select a valid date of birth")
            setDOB(" ");
        }
        else{
            try {
                const res = await addPatient({ name: fname+" "+lname, address, email, nic, occupation, consultant, gender, age, dob: new Date(dob).toISOString(), bloodgroup: blood, mobile: parseInt(mobile), home: parseInt(homeNo), insurancecompany: insuranceCompany, insurancepolicyno: iPolicyNo, medicalcondition: medicalCondition }).unwrap();
                toast.success('Patient Added Successfully!')

                setFName('')
                setLName('')
                setNIC('')
                setAddress('')
                setEmail('')
                setOccupation('')
                setConsultant('')
                setGender('')
                setAge('')
                setDOB(' ')
                setBlood('')
                setMobile('')
                setHomeNo('')
                setInsuranceCompany('')
                setIPolicyNo('')
                setMedicalCondition('')
                setSearchParam('')
                setPatients('')
                setSearchLoading('')

            } catch (err) {
                console.log(err);
                toast.error(err.data?.message || err.data?.error || err.error || err);
            }
        }
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        
        if(searchParam){
            try {
                setSearchLoading(true)

                const patientRes = await getPatients(searchParam).unwrap();

                setPatients(patientRes);
                console.log(patientRes);
                setSearchLoading(false)
            } catch (err) {
                console.log(err);
                setSearchLoading(false)
                toast.error(err.data?.message || err.data?.error || err.error || err);
            }
        }
        else{
            toast.error("Enter Patient Mobile No / NIC / Name To Search")
        }

    }


    return(
        <>
            
            
            <Container style={{width:'100%', display:'flex', justifyContent:'center', marginBottom:'50px' , marginTop:'50px'}}>
            
                <Row style={{width:'100%'}}>
                    <Col lg={6}>
                        <Card style={{padding:'10px', boxShadow:'0 0 10px #0000004f'}}>
                            <h3 style={{textAlign:'center'}}>Register Patient</h3>
                            <form style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:'column'}} onSubmit={submitHandler}>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={fname} onChange={(e) => setFName(e.target.value)} label="First Name" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                    <Col>
                                        <TextField value={lname} onChange={(e) => setLName(e.target.value)} label="last Name" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={nic} inputProps={{ maxLength: 12, minLength: 10}} onChange={(e) => setNIC(e.target.value)} label="NIC" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Address" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={occupation} onChange={(e) => setOccupation(e.target.value)} label="Occupation" variant="outlined" size="small" fullWidth  />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={consultant} onChange={(e) => setConsultant(e.target.value)} label="Consultant" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <FormControl required>
                                            <FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="gender-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <Row>
                                                    <Col><FormControlLabel value="male" control={<Radio />} label="Male" /></Col>
                                                    <Col><FormControlLabel value="female" control={<Radio />} label="Female" /></Col>
                                                </Row>
                                            </RadioGroup>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField  type="date" value={dob} onChange={(e) => handleDOBChange(e.target.value)} label="Date Of Birth" variant="outlined" size="small" fullWidth required />
                                    </Col>
                                    <Col>
                                        <TextField value={age} label="Age" variant="outlined" size="small" fullWidth readOnly />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <FormControl fullWidth size="small" required>
                                            <InputLabel id="bloodgroup-select-label">Select Blood Group</InputLabel>
                                            <Select
                                                labelId="bloodgroup-select-label"
                                                id="bloodgroup-select"
                                                value={blood}
                                                label="Blood Group"
                                                onChange={(e) => setBlood(e.target.value)}
                                            >
                                                <MenuItem value={'A+'}>A+</MenuItem>
                                                <MenuItem value={'A-'}>A-</MenuItem>
                                                <MenuItem value={'B+'}>B+</MenuItem>
                                                <MenuItem value={'B-'}>B-</MenuItem>
                                                <MenuItem value={'AB+'}>AB+</MenuItem>
                                                <MenuItem value={'AB-'}>AB-</MenuItem>
                                                <MenuItem value={'O+'}>O+</MenuItem>
                                                <MenuItem value={'O-'}>O-</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField type="tel" inputProps={{ maxLength: 10, minLength: 10}} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} label="Mobile No" variant="outlined" size="small" fullWidth required  />
                                    </Col>
                                    <Col>
                                        <TextField type="tel" inputProps={{ maxLength: 10, minLength: 10}} value={homeNo} onChange={(e) => setHomeNo(e.target.value.replace(/\D/g, ""))} label="Home No" variant="outlined" size="small" fullWidth />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <TextField value={insuranceCompany} onChange={(e) => setInsuranceCompany(e.target.value)} label="Insurance Company" variant="outlined" size="small" fullWidth />
                                    </Col>
                                    <Col>
                                        <TextField value={iPolicyNo} type="number" onChange={(e) => setIPolicyNo(e.target.value)} label="Insurance Policy No" variant="outlined" size="small" fullWidth />
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingTextarea"
                                            label="Medical Conditions"
                                            className="mb-3"
                                        >
                                            <Form.Control as="textarea" placeholder="Medical Conditions" style={{ height: '100px' }} value={medicalCondition} onChange={(e) => setMedicalCondition(e.target.value)} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row style={{margin:'10px'}}>
                                    <Col>
                                    <Button variant="contained" loading={isLoading} type="submit" fullWidth>Register</Button>
                                        
                                    </Col>
                                </Row>
                            </form>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{padding:'10px', boxShadow:'0 0 10px #0000004f'}}>
                        <h3 style={{textAlign:'center'}}>Patient Deatails</h3>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', background:'#dadae93b'}}
                                onSubmit={handleSearch}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="'To Search Patients Enter (Mobile No / NIC / Name)'"
                                    inputProps={{ 'aria-label': 'To Search Patients Enter (Mobile No / NIC / Name)' }}
                                    value={searchParam}
                                    onChange={(e) => setSearchParam(e.target.value)}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                    <Search />
                                </IconButton>
                            </Paper>
                            <Row style={{margin:'20px 0px 0px 10px', justifyContent:'center'}}>
                                {searchLoading? 
                                    <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                  </Box>
                                : !patients ? 
                                    'No Patient Found ' 
                                    :
                                    <><h3 style={{textAlign:'center'}}>Patient Details</h3>
                                    <Carousel interval={100000} variant="dark" style={{marginTop:'-35px'}} controls={patients.length >= 2}>
                                        {patients.map((patient, index) => (
                                            <Carousel.Item key={index}>
                                                <Carousel.Caption style={{position:'unset', margin:'20px 30px',textAlign:'left', padding:'25px'}}>
                                                    <Row>
                                                        <Col lg={5}>Name</Col>
                                                        <Col>{patient.name}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>NIC</Col>
                                                        <Col>{patient.nic}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Address</Col>
                                                        <Col>{patient.address}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Email</Col>
                                                        <Col>{patient.email}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Consultant</Col>
                                                        <Col>{patient.consultant}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Occupation</Col>
                                                        <Col>{patient.occupation || '--'}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Gender</Col>
                                                        <Col>{patient.gender}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>DOB</Col>
                                                        <Col>{patient.dob.split('T')[0]}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Age</Col>
                                                        <Col>{patient.age}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Blood Group</Col>
                                                        <Col>{patient.bloodgroup}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Mobile No</Col>
                                                        <Col>{patient.mobile}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Home No</Col>
                                                        <Col>{patient.home == 0 ? '--' : patient.home}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Insurance Company</Col>
                                                        <Col>{patient.insurancecompany || '--'}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Insurance Policy No</Col>
                                                        <Col>{patient.insurancepolicyno || '--'}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={5}>Medical Conditions</Col>
                                                        <Col>{patient.medicalcondition || '--'}</Col>
                                                    </Row>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel></>
                                }
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;