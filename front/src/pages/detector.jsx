import {
  Avatar, Typography, Button, Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import React, { useEffect, useState } from 'react';

export function Detector() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [url, setUrl] = useState(null)
  const [imageprev, setImageprev] = useState(null)

  const handleImageChange = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setUrl(reader.result)
    }
    reader.readAsDataURL(file)
    setSelectedImage(event.target.files[0]);
  };
  useEffect(() => {
    if (url) {
      setImageprev(<img src={url} alt='' style={{ aspectRatio: 'auto', maxHeight: "150px" }} />);
    } else {
      setImageprev(<div className="previewText">Please select an Image for Preview</div>);
    }
  }, [result, url])
  const handleFormSubmit = (event) => { // api call 
    event.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append('ultrasound', selectedImage);

      fetch('http://127.0.0.1:8000/api/ultrasound', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the prediction result from the Django backend
          setResult(data.result)
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
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
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                      <div className="-mt-20 w-40">
                        <Avatar
                          src="/img/upl.png"
                          alt="Profile picture"
                          variant="circular"
                          onClick={() => {
                            document.getElementById("imageInput").click()
                          }}
                          className="h-full w-full shadow-xl"
                        />
                        <div><div className="previewComponent">
                          <input 
                            style={{ display: "none" }}
                            type="file"
                            name="ultrasound"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="fileInput"
                          />
                        </div> </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-center lg:self-center">
                    {selectedImage === null ? "" : <Button type="submit" className="bg-blue-400">Detect</Button>}
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center lg:pt-10">
                      {result === null ? "" : <Typography>{"This patient is "}<Typography variant="h5" color={result === 'infected' ? "red" : "green"} >
                        {result}</Typography></Typography>}
                    </div>
                  </div>
                </div>
              </form>
              <div className="my-8 text-center">
                {selectedImage === null ? "" : <Typography variant="h6" color="blue-gray" className="mb-2">
                  {selectedImage.name}
                </Typography>}
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Upload Your Ultrasound Here
                </Typography>
              </div>
              <div className="my-8 text-center flex justify-center">
                {imageprev}
              </div>
              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      Our PCOS detector utilizes ultrasound images to determine the presence of PCOS in patients. By analyzing the ovaries for multiple cysts and other characteristic features, it provides an output indicating whether the patient is likely to have PCOS or not. This non-invasive and accurate diagnostic tool aids in timely detection and appropriate management of PCOS.
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

export default Detector;
