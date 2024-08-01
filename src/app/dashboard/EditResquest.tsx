import React, { useContext } from 'react'; 
import { trpc } from "../_trpc/client";

type Request = {
    id: string;
    userId: string;
  };

 const GetRequest = () => {
    const { data, isLoading} = trpc.request.getAllEditRequest.useQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

  

    return (
        <div>
            {data?.map((request) => (
                <div key={request.id}>
                    <h3>{request.documentId}</h3>
                    <p>{request.requestType}</p>
                </div>
            ))}
        </div>
    );
};
export default GetRequest