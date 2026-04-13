import React, { useState } from "react";

interface Person {
  id: string;
  name: string;
  job: string;
}

interface FormProps {
  handleSubmit: (person: Person) => void;
}

function Form(props: FormProps) {
  const [person, setPerson] = useState({
    id: "",
    name: "",
    job: "",
  });
  //HTMLInputElement is used to access element-specific attributes
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "job") {
      setPerson({ id: person["id"], name: person["name"], job: value });
    } else {
      setPerson({ id: person["id"], name: value, job: person["job"] });
    }
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ id: "", name: "", job: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
