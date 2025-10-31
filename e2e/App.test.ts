import { expect, test } from 'vitest'
import { render } from 'vitest-browser-svelte'
import App from "../src/App.svelte"
import { userEvent } from 'vitest/browser'

test('Renders', async () => {
  const { getByText, getByPlaceholder } = render(App, { name: 'App' })
  
  await userEvent.fill(getByPlaceholder("Email"), "mock.user@gmail.com")
  await userEvent.fill(getByPlaceholder("Senha"), "S_enha64")
  await userEvent.click(getByText("Login"))

  await expect.element(getByText("mock.user")).toBeInTheDocument()
  await expect.element(getByText("Mensagens para sua empresa")).toBeInTheDocument()
  await expect.element(getByText("5521921232132")).toBeInTheDocument()
  await expect.element(getByText("mock.disposable@gmail.com")).toBeInTheDocument()
  await expect.element(getByText("hello there")).toBeInTheDocument()
})