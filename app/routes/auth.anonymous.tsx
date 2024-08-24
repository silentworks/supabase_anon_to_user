import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createServerClient } from "~/lib/supabase";
import { fault } from "~/lib/utils";

export const loader = async ({ 
  request 
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let { supabase, headers } = createServerClient(request, new Headers());

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    return json(fault({ message: 'Server error. Try again later.' }));
  }

  return redirect('/', { headers });
};
  