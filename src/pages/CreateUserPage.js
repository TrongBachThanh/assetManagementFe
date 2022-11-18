import CreateUser from "../components/create-user/CreateUser";
import CreateUserProvider from "../contexts/providers/CreateUserProvider";

const CreateUserPage = props => {
  return (
    <CreateUserProvider>
      <CreateUser />    
    </CreateUserProvider>
  )
}

export default CreateUserPage;