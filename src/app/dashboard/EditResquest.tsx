"use client";
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Request = {
  id: string;
  documentTitle: string;
  requesterId: string | null;
  requesterName: string | null;
  requestType: string;
  requestStatus: string;
  requestDate: string;
};

const GetRequest = () => {
  const [pendingRequestId, setPendingRequestId] = useState<string | null>(null);
  const { data, isLoading, error, refetch } =
    trpc.request.getMyRequest.useQuery();

  const approveRequest = trpc.request.approveEditRequest.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error during approveRequest mutation:", error);
    },
  });

  const rejectRequest = trpc.request.denyEditRequest.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error during rejectRequest mutation:", error);
    },
  });

  const deleteRequest = trpc.request.deleteRequest.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error during deleteRequest mutation:", error);
    },
  });

  const handleApprove = (requestId: string) => {
    setPendingRequestId(requestId);
    approveRequest.mutate({ editRequestId: requestId });
  };

  const handleDeny = (requestId: string) => {
    setPendingRequestId(requestId);
    rejectRequest.mutate({ editRequestId: requestId });
  };

  const handleDelete = (requestId: string) => {
    setPendingRequestId(requestId);
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequest.mutate({ id: requestId });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }
  const isActionPending = approveRequest.isPending || rejectRequest.isPending || deleteRequest.isPending;


  return (
    <div className="max-w-full overflow-x-auto p-4">
      <Table className="w-3/4 mx-auto">
        <TableCaption>List of Edit Requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Document Title</TableHead>
            <TableHead className="w-1/5">Requester Name</TableHead>
            <TableHead className="w-1/5">Request Type</TableHead>
            <TableHead className="w-1/5">Status</TableHead>
            <TableHead className="w-1/5">Date</TableHead>
            <TableHead className="w-1/5">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((request: Request) => {
            return (
              <TableRow key={request.id}>
                <TableCell>{request.documentTitle}</TableCell>
                <TableCell>{request.requesterName || "Unknown"}</TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>{request.requestStatus}</TableCell>
                <TableCell>
                  {new Date(request.requestDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-start gap-2">
                    {request.requestStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className={`text-sm px-2 py-1 rounded bg-green-500 text-white hover:bg-green-400 ${approveRequest.isPending && pendingRequestId == request.id ? "animate-pulse" : ""} ${isActionPending && pendingRequestId === request.id ? "cursor-not-allowed" : ""}`}
                          disabled={isActionPending && pendingRequestId === request.id}
                        >
                          Allow
                        </button>
                        <button
                          onClick={() => handleDeny(request.id)}
                          className={`text-sm px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-400 ${rejectRequest.isPending && pendingRequestId == request.id ? "animate-pulse" : ""} ${isActionPending && pendingRequestId === request.id ? "cursor-not-allowed" : ""}`}
                          disabled={isActionPending && pendingRequestId === request.id}
                        >
                          Deny
                        </button>

                      </>
                    )}
                    <button
                      onClick={() => handleDelete(request.id)}
                      className={`text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-400 ${deleteRequest.isPending && pendingRequestId == request.id ? "animate-pulse" : ""} ${isActionPending && pendingRequestId === request.id ? "cursor-not-allowed" : ""}`}
                      disabled={isActionPending && pendingRequestId === request.id}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default GetRequest;
