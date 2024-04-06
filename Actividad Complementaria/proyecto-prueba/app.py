from flask import Flask, request, jsonify, render_template
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_character', methods=['POST'])
def create_character():
    # Cargar la imagen del personaje Flask
    character_img = cv2.imread('C:\\ARCHIVOS-no borrar\\PERSONAL\\Universidad\\Actividad Complementaria\\proyecto-prueba\\static\\images\\flash.jpg')
    character_img = cv2.resize(character_img, (400, 400))

    # Obtener la imagen subida por el usuario
    user_img = request.files['user_image']
    user_img = cv2.imdecode(np.fromstring(user_img.read(), np.uint8), cv2.IMREAD_COLOR)
    user_img = cv2.resize(user_img, (400, 400))

    # Superponer las imágenes
    combined_img = cv2.addWeighted(character_img, 0.5, user_img, 0.5, 0)

    # Guardar la imagen combinada
    cv2.imwrite('C:\\ARCHIVOS-no borrar\\PERSONAL\\Universidad\\Actividad Complementaria\\proyecto-prueba\\flash-2.jpg', combined_img)

    return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run(debug=True)
