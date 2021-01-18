import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactsItem from "./ContactsItem";

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.lenght === 0) {
		return <h4>Please add a contact</h4>;
	}
	return (
		<>
			<TransitionGroup>
				{filtered !== null
					? filtered.map((contact) => (
							<CSSTransition
								key={contact.id}
								timeout={500}
								classNames="item"
							>
								<ContactsItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map((contact) => (
							<CSSTransition
								key={contact.id}
								timeout={500}
								classNames="item"
							>
								<ContactsItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</>
	);
};

export default Contacts;
