import pandas as pd
import numpy as np
import tensorflow as tf
import joblib

# Load the h5 model file
model = joblib.load('pcos.h5')

# Define the feature names in the same order as the model input
feature_names = [
    'Age (yrs)', 'Weight (Kg)', 'Height(Cm)', 'BMI', 'Blood Group', 'Pulse rate(bpm)',
    'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'Marraige Status (Yrs)',
    'Pregnant(Y/N)', 'No. of aborptions', 'I beta-HCG(mIU/mL)', 'II beta-HCG(mIU/mL)',
    'FSH(mIU/mL)', 'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)', 'Waist:Hip Ratio',
    'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)', 'Vit D3 (ng/mL)', 'PRG(ng/mL)', 'RBS(mg/dl)',
    'Weight gain(Y/N)', 'hair growth(Y/N)', 'Skin darkening (Y/N)', 'Hair loss(Y/N)',
    'Pimples(Y/N)', 'Fast food (Y/N)', 'Reg.Exercise(Y/N)', 'BP _Systolic (mmHg)',
    'BP _Diastolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)', 'Avg. F size (L) (mm)',
    'Avg. F size (R) (mm)', 'Endometrium (mm)', 'BMI_a', 'BMI_b', 'BMI_c', 'hypo_s', 'normal_s',
    'pre_hyper_s', 'hyper_s', 'abn1', 'abn2', 'nrml'
]

# Sample input data (replace with your actual data)
input_data = [
    [25, 65.2, 165.3, 23.9, 2, 75, 14, 12.5, 1, 30, 3, 1, 0, 1.2, 1.5, 6.7, 5.8, 1.2, 40, 30, 0.75,
     2.5, 1.2, 2.3, 30, 4.5, 100, 1, 1, 0, 1, 1, 0, 120, 80, 8, 8, 18.5, 18.5, 8, 1, 0, 0, 0, 1, 0, 0, 1]
]

# Create a DataFrame from the input data using the feature names as column names
input_df = pd.DataFrame(input_data, columns=feature_names)

input_array = input_df.values.astype(np.float32)

# Perform the prediction
predictions = model.predict(input_array)

# Get the predicted class (0 or 1)
predicted_class = int(predictions[0][0])

# Define the class labels (replace with your own labels if necessary)
class_labels = ['No PCOS', 'PCOS']

# Get the corresponding class label
predicted_label = class_labels[predicted_class]

# Print the predicted label
print(f"Predicted PCOS: {predicted_label}")
