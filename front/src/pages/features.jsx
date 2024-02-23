import {
  Avatar, Typography, Card,
  CardBody,
  CardHeader,
  Radio,
  Select, Option, Button,
  Input
} from "@material-tailwind/react";
import axios from "axios";
import { Footer } from "@/widgets/layout";
import React, { useEffect, useState } from 'react';

export function Features() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    ' Age (yrs)': '',
    'Weight (Kg)': '',
    'Height(Cm)': '',
    'BMI': '',
    'Blood Group': '',
    'Pulse rate(bpm)': '',
    'RR (breaths/min)': '',
    'Hb(g/dl)': '',
    'Cycle(R/I)': '',
    'Cycle length(days)': '',
    'Marraige Status (Yrs)': '',
    'Pregnant(Y/N)': '',
    'No. of aborptions': '',
    '  I   beta-HCG(mIU/mL)': '',
    'II    beta-HCG(mIU/mL)': '',
    'FSH(mIU/mL)': '',
    'LH(mIU/mL)': '',
    'FSH/LH': '',
    'Hip(inch)': '',
    'Waist(inch)': '',
    'Waist:Hip Ratio': '',
    'TSH (mIU/L)': '',
    'AMH(ng/mL)': '',
    'PRL(ng/mL)': '',
    'Vit D3 (ng/mL)': '',
    'PRG(ng/mL)': '',
    'RBS(mg/dl)': '',
    'Weight gain(Y/N)': '',
    'hair growth(Y/N)': '',
    'Skin darkening (Y/N)': '',
    'Hair loss(Y/N)': '',
    'Pimples(Y/N)': '',
    'Fast food (Y/N)': '',
    'Reg.Exercise(Y/N)': '',
    'BP _Systolic (mmHg)': '',
    'BP _Diastolic (mmHg)': '',
    'Follicle No. (L)': '',
    'Follicle No. (R)': '',
    'Avg. F size (L) (mm)': '',
    'Avg. F size (R) (mm)': '',
    'Endometrium (mm)': '',
  });
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    localStorage.setItem("data", JSON.stringify(formData));
    // Append each field and its value to the FormData object
    Object.entries(formData).forEach(([fieldName, value]) => {
      fd.append(fieldName, value);
    });

    // Send the form data using axios
    axios.post('http://127.0.0.1:8000/api/feature', formData)
      .then(response => {
        setResult(response.data.result[0])
        console.log(response.data.result[0]);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('data')) {
      setFormData(JSON.parse(localStorage.getItem('data')));
    }
  }, [])

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('C:/Users/91788/Desktop/pcos/front/public/img/4289897.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">


                <form onSubmit={handleSubmit} className="p-4">
                  <div className="flex flex-wrap justify-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      PCOS DETECTION
                    </Typography>
                  </div>
                  <div className="grid grid-cols-2 gap-4 justify-center" style={{ marginTop: "20px" }}>

                    {/* Render the input fields */}
                    {Object.keys(formData).map((fieldName, index) => (
                      <div key={fieldName} className="mb-4">
                        {fieldName.includes('Y/N') ? (

                          <div className="flex gap-10">
                            <label className="text-gray-700 text-sm">{fieldName}</label>

                            <Radio
                              // required
                              id="ripple-on"
                              key={fieldName + 'y'}
                              name={fieldName}
                              label='Yes'
                              value="1"
                              onChange={handleChange}
                              ripple={true}
                            />
                            <Radio
                              // required
                              id="ripple-off"
                              name={fieldName}
                              onChange={handleChange}
                              value="0"
                              key={fieldName + 'n'}
                              label='No'
                              ripple={false}
                            />
                          </div>
                        ) : (
                          <Input size="md"
                            // required
                            type="text"
                            name={fieldName}
                            value={formData[fieldName]}
                            onChange={handleChange}
                            key={fieldName}
                            color="lightBlue"
                            label={`Enter ${fieldName}`}
                            className="w-full"
                          />
                        )}
                      </div>
                    ))}


                  </div>
                  <div className="flex flex-wrap justify-center">
                    <Button type="submit" color="lightBlue" buttonType="filled" size="regular" ripple="light">Submit</Button>
                  </div>
                  <div className="flex flex-wrap justify-center" style={{ marginTop: '50px' }}>
                    {result === null ? "" : <Typography style={{ float: 'left', display: 'flex', flexDirection: 'column' }}>{"This patient is "}<Typography variant="h5" color={result === 1 ? "red" : "green"} >
                      {result === 1 ? "Infected" : "Not Infected"}</Typography></Typography>}
                  </div>
                </form>

              </div>


              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      Introducing PCOS Detect: Advanced tool for early detection of Polycystic Ovary Syndrome (PCOS). Analyzes 51 body features with precision, empowering women with quick, non-invasive results. User-friendly, confidential, and proactive. Transforming PCOS detection for better treatment outcomes and reproductive health. Take control of your health today.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Features;
