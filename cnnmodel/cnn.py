import os
from fastapi import HTTPException
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

class CNNModel:
    def __init__(self):
        self.label = [
            "Amaranthus Green", "Asthma Plant", "Avaram", "Balloon vine", "Bellyache bush (Green)",
            "Betel Leaves", "Black-Honey Shrub", "Benghal dayflower", "Bristly Wild Grape", "Butterfly Pea",
            "Cape Gooseberry", "Celery", "Common Wireweed", "Coatbuttons", "Country Mallow", "Crown flower",
            "Dwarf Copperleaf (Green)", "Gongura", "Green Chireta", "Ivy Gourd.zip", "Indian Jujube", 
            "Indian Stinging Nettle", "Indian Thornapple", "Indian wormwood", "Lagos Spinach", "Lambs Quarters", 
            "Land Caltrops (Bindii)", "Lettuce Tree", "Malabar Catmint", "Malabar Spinach (Green)", 
            "Madagascar Periwinkle", "Madras Pea Pumpkin", "Mexican Mint", "Mexican Prickly Poppy", 
            "Mint Leaves", "Mountain Knotgrass", "Mustard", "Nalta Jute", "Night blooming Cereus", 
            "Palak", "Panicled Foldwing", "Prickly Chaff Flower", "Punarnava", "Purple Fruited Pea Eggplant", 
            "Purple Tephrosia", "Rosary Pea", "Shaggy button weed", "Siru Keerai", "The Bengal dayflower", 
            "Wormwood"
        ]
        self.model_path = r"D:\dp_pranay\medicinal-plant-analysis\cnnmodel\model_avg_25.h5"  #pranay change the path of the model according to your system
        self.model = tf.keras.models.load_model(self.model_path)
        self.image_size = (299, 299)


    def predict(self, image_path):
        try:
            img = tf.keras.preprocessing.image.load_img(image_path, target_size=self.image_size)
            img_array = tf.keras.preprocessing.image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error loading image: {str(e)}")   
        
        try:
            predictions = self.model.predict(img_array)
            predictions_index = np.argmax(predictions, axis=1)
            confindence_score =  predictions[0][predictions_index[0]]
            predicted_label = self.label[predictions_index[0]]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error making prediction: {str(e)}")
        
        return predicted_label, confindence_score
    
