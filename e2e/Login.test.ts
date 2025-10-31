import { expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Login from "../src/screens/Login.svelte"
import { userEvent } from 'vitest/browser'

test('Renders', async () => {
  const { getByText } = render(Login, { name: 'Login' })
  await expect.element(getByText("Login")).toBeInTheDocument()
})

test('Empty fields fails', async () => {
  const { getByText } = render(Login, { name: 'Login' })
  await userEvent.click(getByText("Login"))
  await expect.element(getByText("Preencha todos os campos!")).toBeInTheDocument()
})

test('Password empty fails', async () => {
  const { getByText, getByPlaceholder } = render(Login, { name: 'Login' })
  await userEvent.fill(getByPlaceholder("Email"), "mock.user@gmail.com")
  await userEvent.click(getByText("Login"))
  await expect.element(getByText("Preencha todos os campos!")).toBeInTheDocument()
})

test('Email empty fails', async () => {
  const { getByText, getByPlaceholder } = render(Login, { name: 'Login' })
  await userEvent.fill(getByPlaceholder("Senha"), "S_enha64")
  await userEvent.click(getByText("Login"))
  await expect.element(getByText("Preencha todos os campos!")).toBeInTheDocument()
})

test('Invalid email fails', async () => {
  const { getByText, getByPlaceholder } = render(Login, { name: 'Login' })
  await userEvent.fill(getByPlaceholder("Email"), "mock.user.com")
  await userEvent.fill(getByPlaceholder("Senha"), "S_enha64")
  await userEvent.click(getByText("Login"))
  await expect.element(getByText("Endereço de email inválido!")).toBeInTheDocument()
})

test('Login succeeds', async () => {
  const { getByText, getByPlaceholder } = render(Login, { name: 'Login' })
  await userEvent.fill(getByPlaceholder("Email"), "mock.user@gmail.com")
  await userEvent.fill(getByPlaceholder("Senha"), "S_enha64")
  await userEvent.click(getByText("Login"))
  await expect.poll(() => getByText("Email ou senha incorretos!").query()).not.toBeInTheDocument()
})

test('Login wrong credentials', async () => {
  const { getByText, getByPlaceholder } = render(Login, { name: 'Login' })
  await userEvent.fill(getByPlaceholder("Email"), "mock.user@gmail.com")
  await userEvent.fill(getByPlaceholder("Senha"), "S_enha")
  await userEvent.click(getByText("Login"))
  await expect.element(getByText("Email ou senha incorretos!")).toBeInTheDocument()
})