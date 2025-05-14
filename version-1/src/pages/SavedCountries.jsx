import { useState } from 'react';


export default function savedCountries() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let dataObj = formData;
        console.log(dataObj);
        setFormData({ name: '', email: '', country: '' }); // Reset the form
        //send dataObj to backend
      };

    return (
        <>


            <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          placeholder="Name"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email"></label>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="country"></label>
        <input
          placeholder="Country"
          type="country"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
        />
         <label htmlFor="bio">
          
          <textarea value={formData.bio} onChange={handleChange} placeholder="Bio"/>
        </label> 
        <button type="submit">Submit</button>
      </form>
        </>
    )
}