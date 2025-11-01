import { isLoggedIn } from "./state.svelte";
import type { Entry, User } from "./entity";
import { auth_get, post } from "./requester";

export function login(
  email: String,
  password: String,
  onError: (message: string) => void
) {
  post("/user/login", { email: email, password: password })
    .then(response => {
      localStorage.setItem("AUTH_TOKEN", response.data);
      isLoggedIn.set(true);
    })
    .catch(error => {
      let message = "Aconteceu um erro inesperado!";

      if (error.status == 401) message = "Email ou senha incorretos!";
      if (error.status == 502) message = "Parece que o servidor está fora do ar, tente novamente mais tarde";

      onError(message);
    });
}

export async function me() {
  const response = await auth_get("/user/me");
  return response.data as User
}

export async function formsForMe() {
  const response = await auth_get("/form/me/listAll")
  return response.data.forms as Array<Entry>
}

export async function visualizeForm(entry: Entry) {
  await auth_get(`/form/me/${entry.id}/view`);
}