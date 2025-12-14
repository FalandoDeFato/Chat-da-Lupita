export const API_URL = "https://falando-de-fato-backend-production.up.railway.app";

export async function cadastrarUsuario(formData) {
  const res = await fetch(`${API_URL}/auth/cadastro`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.detail || "Erro ao cadastrar");
  }

  return res.json();
}

export async function loginUsuario(formData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.detail || "Erro ao logar");
  }

  return res.json();
}
