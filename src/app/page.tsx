'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'react-toastify';
import Input from "./Components/Input";
import { API_BASE_URL } from "./utils/site-constants";
import { validateEmail } from "./utils/utils";


const INPUT_INITIAL_VALUE = { value: "", error: false, helperText: "" };

export default function Home() {
  const [firstName, setFirstName] = useState(INPUT_INITIAL_VALUE);
  const [lastName, setLastName] = useState(INPUT_INITIAL_VALUE);
  const [email, setEmail] = useState(INPUT_INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, id} = event.target;
    if(id === "user_email"){
      setEmail({
        value,
        error: false,
        helperText: ""
      })
      return;
    }
    if(id === "user_last_name"){
      setLastName({
        value,
        error: false,
        helperText: ""
      })
      return;
    }
    setFirstName({
      value,
      error: false,
      helperText: ""
    })
  };

  const validateForm = () => {
    let isFormValid = true;
    if(firstName.value.trim().length === 0){
      isFormValid = isFormValid && false;
      setFirstName((prevValue) => ({...prevValue, error: true, helperText: "Please enter your first name."}));
    }
    if(lastName.value.trim().length === 0){
      isFormValid = isFormValid && false;
      setLastName((prevValue) => ({...prevValue, error: true, helperText: "Please enter your last name."}));
    }
    if(email.value.trim().length === 0){
      isFormValid = isFormValid && false;
      setEmail((prevValue) => ({...prevValue, error: true, helperText: "Please enter your email address."}));
    }
    if(!validateEmail(email.value)){
      isFormValid = isFormValid && false;
      setEmail((prevValue) => ({...prevValue, error: true, helperText: "Please enter a valid email address."}));
    }
    return isFormValid;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!validateForm()) return;
    try{
      setIsSubmitting(true);
      const data = {
        email: email.value,
        firstName: firstName.value,
        lastName : lastName.value
      }
      const response = await fetch(`${API_BASE_URL}/api/users/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const parsedResponse = await response.json();
      toast.success("📬 Fantastic! Your message is on its way to us. We can't wait to connect and chat! 🚀", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail(INPUT_INITIAL_VALUE);
      setFirstName(INPUT_INITIAL_VALUE);
      setLastName(INPUT_INITIAL_VALUE);
    }catch(e){
      toast.error("Oops! Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(e);
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <main className="min-h-screen max-w-screen-2xl mx-auto my-auto mb-10">
      <div className="relative rounded">
        <div className="absolute headerContainer rounded max-sm:items-end">
          <h1 className="text-5xl text-white leading-tight w-2/4 font-medium max-sm:w-[80%] max-sm:text-[28px]">
            Branded tracking pages for Shopify merchants
          </h1>
        </div>
        <img
          src="/truck_parcel.png"
          alt=""
          className="max-h-[550px] w-full object-cover flip rounded"
        />
      </div>
      <p className="text-2xl text-center m-8 max-sm:text-xl max-sm:text-left">
        Say good bye to boring Fedex and UPS tracking pages. Use the branded
        tracking pages to up-sell and cross-sell. Communicate offers and promotions like a pro!
      </p>

      <div className="flex gap-1.5 p-12 border-gray-300 rounded max-sm:p-1 max-sm:shadow-none">
        <form className="grow w-2/4" onSubmit={handleSubmit} >
          <h2 className="text-center text-2xl font-semibold mb-6">
            Get in Touch
          </h2>
          <div className="flex flex-col w-3/4 m-[auto] gap-6">
            <Input
              helperText={ firstName.error ? firstName.helperText : null}
              nativeProps={{
                placeholder: "First Name",
                type: "text",
                id: "user_name",
                onChange: handleChange,
                value: firstName.value
              }}
            />
            <Input
              helperText={ lastName.error ? lastName.helperText : null}
              nativeProps={{
                placeholder: "Last Name",
                type: "text",
                id: "user_last_name",
                onChange: handleChange,
                value: lastName.value
              }}
            />
            <Input
              helperText={ email.error ? email.helperText : null}
              nativeProps={{
                placeholder: "Email",
                type: "text",
                id: "user_email",
                onChange: handleChange,
                value: email.value
              }}
            />
            <button
              type="submit"
              className="m-[auto] py-1.5 px-4 w-fit text-white rounded bg-[#ffad53] shadow-md border-gray-300 disabled:text-black disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {
                isSubmitting ? "Submitting.." : "Submit"
              }
            </button>
          </div>
        </form>
        <img className="grow w-2/4 rounded max-sm:hidden" src="/dog_parcel.png" alt="" />
      </div>
    </main>
    </>
  );
}
