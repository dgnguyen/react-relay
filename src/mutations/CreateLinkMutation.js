import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
        postedById
      }
    }
  }
`

export default (postedById, description, url, callback) => {
  
  const variables = {
    input: {
      postedById,
      description,
      url,
      clientMutationId: ""
    },
  }
  console.log(variables)

  commitMutation(
    environment,
    {
      mutation,
      variables,
      // 6
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}