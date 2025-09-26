import streamlit as st
import requests
import uuid

# Configuración de la página
st.set_page_config(page_title="Chatbot Text2SQL con n8n", layout="wide")

# Función para consultar el flujo n8n
def consultarChatbot(sesion, mensaje):
    #url = "https://informacion-int-dev.apps.ambientesbc.com/n8n/n8n-webhook/v1/webhook/prueba"
    url=  "https://informacion-int-dev.apps.ambientesbc.com/n8n/n8n-webhook/v1/webhook/prueba"

    payload = {
        "session": sesion,
        "chatInput": mensaje  # Este campo debe coincidir con el que usa el flujo n8n
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, json=payload, verify=False)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        return f"⚠️ Error al conectar con n8n: {e}"

    sql = data.get("corrected_sql") or data.get("sql_query") or "⚠️ No se generó SQL."
    raw = data.get("raw_response", "")
    success = data.get("success", False)

    respuesta = f"🧠 SQL generado:\n```sql\n{sql}\n```"
    if raw:
        respuesta += f"\n\n🗒️ Respuesta del agente:\n```text\n{raw}\n```"
    if not success:
        respuesta += "\n⚠️ El agente no pudo generar una consulta válida."

    return respuesta

# Interfaz de Streamlit
st.title("🤖 Chatbot Text2SQL conectado a n8n")

if "messages" not in st.session_state:
    st.session_state.messages = []

if "sesion" not in st.session_state:
    st.session_state.sesion = uuid.uuid4().hex

# Mostrar historial
for msg in st.session_state.messages:
    with st.chat_message(msg["role"], avatar="robot-one-svgrepo-com.png" if msg["role"] == "assistant" else "user-svgrepo-com.png"):
        st.markdown(msg["content"])

# Entrada del usuario
if prompt := st.chat_input("¿Qué consulta deseas realizar sobre la base de datos?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar="user-svgrepo-com.png"):
        st.markdown(prompt)

    respuesta = consultarChatbot(st.session_state.sesion, prompt)

    with st.chat_message("assistant", avatar="robot-one-svgrepo-com.png"):
        st.markdown(respuesta)

    st.session_state.messages.append({"role": "assistant", "content": respuesta})
