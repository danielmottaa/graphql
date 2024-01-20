import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USERS } from "../App";
import { cliente } from "../lib/apollo";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUsers( name: $name ) {
      id
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState('')
  const [createUsers, { data, loading, error}] = useMutation(CREATE_USER)

   const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();

    if(!name) {
      return;
    }

    await createUsers({
      variables: {
        name,
      },
      update: (cache, { data: {createUsers} }) => {
        const { users } = cliente.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [
              ...users,
              createUsers
            ]
          }
        })
      }
    })
    setName('')
  }

  return (

    <form onSubmit={handleCreateUser}>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}
