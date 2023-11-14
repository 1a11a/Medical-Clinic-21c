import { api } from "./api";

const PATIENTS_URL = '/patients';

export const patientsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addPatient: builder.mutation({
            query: (data) => ({
                url: `${PATIENTS_URL}/new`,
                method: 'POST',
                body: data,
            }),
        }),
        getPatients: builder.mutation({
            query: (data) => ({
                url: `${PATIENTS_URL}/?search=${data}`,
                method: 'GET',
            }),
        })
    }),
});

export const { 
    useAddPatientMutation,
    useGetPatientsMutation 
} = patientsApi;