import {useState} from "react";

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });

    const {name, email, phone, type} = contact;
    const onChange = () => {

    };
    return (
        <>
            <form>
                <h2 className="text-primary">Add contact</h2>
                <input type="text" placeholder="name" name="name" value={name} onChange={onChange}/>
                <input type="text" placeholder="email" name="email" value={email} onChange={onChange}/>
                <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange}/>
                <h5>Contact type</h5>
                <input type="radio" name="type" value="personal" checked={type === "personal"}/>Personal{" "}
                <input type="radio" name="type" value="professional"
                       checked={type === "professional"}/>Professional{" "}
                <div>
                    <input type="submit"/>
                </div>
            </form>

        </>
    );
};

export default ContactForm;