import { FormEvent, useState } from "react";
import Input from "./Input";
import Notification from "./Notification";
import { formToSection, propertyToJson } from "./utils";
import residential from './residential.json'
export default function Form() {
  let [url, setUrl] = useState(localStorage.getItem('url') || "");
  let [error, setError] = useState<undefined | boolean>(undefined)
  let [content, setContent] = useState<undefined | string>(undefined)
  let [title, setTitle] = useState<undefined | string>(undefined)

  let handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let {
      name,
      telephone,
      email,
      twitterURL,
      street,
      streetNumber,
      suburb,
      state,
      postcode,
      country      
    } = formToSection(formData);

    let listingAgent = { name, telephone, email, twitterURL };
    let address = { street, streetNumber, suburb, state, postcode, country };
    

    let listed = propertyToJson(listingAgent, 'listingAgent', residential)
    let addressed = propertyToJson(address, "address", listed)
    
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(addressed)
      })      
      if(response.status !== 200) {
        let error = new Error(`An error was found when making an api call to ${url}`)
        error.name = "Unexpected error"
        throw error
      }
      let json = await response.json()    
      setError(false)
      setTitle("Success!")
      setContent(JSON.stringify(json))
    }

    catch(error: unknown){
      if(error instanceof Error) {
        setError(true)
        setTitle(error.name)
        setContent(error.message)
      }
      else {
        setError(true)
        setTitle("Unexpected error!")
        setContent(`An error was found when making an api call to ${url}`)
      }
      
    }
    
    
  };
  return (
    <div className="p-4">
      <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-teal-600">
        Endpoint:
      </h2>
      <input
        className="border w-full mb-3 pl-2 py-1 text-stone-500"
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUrl(e.currentTarget.value)
            localStorage.setItem('url', e.currentTarget.value)
        }}
      />      
      <form name="form" onSubmit={handleSubmit} >
        <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-teal-600">
          Listing agent:
        </h2>
        <Input title="Name: " name="name" defaultValue="Mr. John Doe" />
        <Input
          title="Telephone: "
          name="telephone"
          defaultValue="05 1234 5678"
        />
        <Input
          title="Email: "
          name="email"
          defaultValue="jdoe@somedomain.com.au"
        />
        <Input
          title="Twitter URL: "
          name="twitterURL"
          defaultValue="https://www.twitter.com/JohnDoe"
        />
        <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-teal-600">
          Address:
        </h2>
        <Input title="Street: " name="street" defaultValue="Main Road" />
        <Input title="Street Number: " name="streetNumber" defaultValue="39" />
        <Input title="Suburb: " name="suburb" defaultValue="RICHMOND" />
        <Input title="State: " name="state" defaultValue="vic" />
        <Input title="Postcode: " name="postcode" defaultValue="3121" />
        <Input title="Country: " name="country" defaultValue="AUS" />
        <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-teal-600">
          About the property:
        </h2>
        <Input
          title="Headline: "
          name="headline"
          defaultValue="SHOW STOPPER!!!"
          disabled={true}
        />
        <Input
          title="Description: "
          name="description"
          defaultValue="Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse.Don't pass up an opportunity like this! First to inspect will buy! Close to local amenities and schools. Features lavishly appointed bathrooms, modern kitchen, rustic outhouse."
          disabled={true}
        />
        <Input title="Price: " name="price" defaultValue="500000" disabled={true}
        />
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-40">
          Submit
        </button>
      </form>
      <h2 className="font-medium leading-tight text-3xl mt-0 mb-2 text-teal-600 mt-5">
          Result:
        </h2>
      <Notification title={title} content={content} error={error}/>
    </div>
  );
}
