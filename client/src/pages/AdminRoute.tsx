import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import AdminDashboard from "./AdminDashboard";

function createAdminQueryClient() {
  const queryClient = new QueryClient();

  const redirectToLoginIfUnauthorized = (error: unknown) => {
    if (!(error instanceof TRPCClientError) || typeof window === "undefined") return;
    if (error.message === UNAUTHED_ERR_MSG) window.location.href = getLoginUrl();
  };

  queryClient.getQueryCache().subscribe((event) => {
    if (event.type === "updated" && event.action.type === "error") {
      redirectToLoginIfUnauthorized(event.query.state.error);
      console.error("[API Query Error]", event.query.state.error);
    }
  });

  queryClient.getMutationCache().subscribe((event) => {
    if (event.type === "updated" && event.action.type === "error") {
      redirectToLoginIfUnauthorized(event.mutation.state.error);
      console.error("[API Mutation Error]", event.mutation.state.error);
    }
  });

  return queryClient;
}

export default function AdminRoute() {
  const [queryClient] = useState(createAdminQueryClient);
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          fetch(input, init) {
            return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
          },
        }),
      ],
    }),
  );

  useEffect(() => () => queryClient.clear(), [queryClient]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AdminDashboard />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
