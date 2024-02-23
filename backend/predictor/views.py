import tensorflow as tf
import keras
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from keras.utils.image_utils import load_img
from .models import PCOSPrediction
import numpy as np
import os
import pandas as pd
import joblib
from .utils import BMI_Insights, Systole, lh


class PCOSPredictionView(APIView):  # ultra sound
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        image_file = request.data.get('ultrasound')

        if not image_file:
            return Response("No image file provided.", status=status.HTTP_400_BAD_REQUEST)

        # Load the H5 model
        pcos_prediction = PCOSPrediction(image=image_file,)
        pcos_prediction.save()
        image_path = os.path.join(
            'C:/Users/91788/Desktop/pcos/backend/media', image_file.name)
        with open(image_path, 'wb') as f:
            for chunk in image_file.chunks():
                f.write(chunk)
        model = keras.models.load_model('predictor/models/ultrasound.h5')
        image = load_img(image_path, target_size=(224, 224))
        img = np.array(image)
        img = img / 255.0
        img = img.reshape(1, 224, 224, 3)
        prediction = model.predict(img)
        l = {"infected": prediction[0][0], "notinfected": prediction[0][1]}

        def get_key(val):
            for key, value in l.items():
                if val == value:
                    return key

            return "key doesn't exist"
        j = prediction.max()
        is_pcos = get_key(j)

        return Response({'result': is_pcos}, status=status.HTTP_200_OK)


class FeatureView(APIView):  # features
    def post(self, request):
        data = request.data
        model = joblib.load(
            'C:/Users/91788/Desktop/pcos/backend/predictor/models/pcos_model.joblib')
        X = []
        for keys, values in data.items():
            if values == '':
                X.append('0')
            else:
                X.append(values)
        bmi = BMI_Insights(int(data['BMI'].split('.')[0]))
        for i in bmi:
            X.append(i)
        systol = Systole(int(data['BP _Systolic (mmHg)']))
        for i in systol:
            X.append(i)
        lhdata = lh(int(data['LH(mIU/mL)'].split('.')[0]))
        for i in lhdata:
            X.append(i)
        X = pd.DataFrame([X], columns=[' Age (yrs)', 'Weight (Kg)', 'Height(Cm) ', 'BMI', 'Blood Group', 'Pulse rate(bpm) ', 'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'Marraige Status (Yrs)', 'Pregnant(Y/N)', 'No. of aborptions', '  I   beta-HCG(mIU/mL)', 'II    beta-HCG(mIU/mL)', 'FSH(mIU/mL)', 'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)', 'Waist:Hip Ratio', 'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)',
                                       'Vit D3 (ng/mL)', 'PRG(ng/mL)', 'RBS(mg/dl)', 'Weight gain(Y/N)', 'hair growth(Y/N)', 'Skin darkening (Y/N)', 'Hair loss(Y/N)', 'Pimples(Y/N)', 'Fast food (Y/N)', 'Reg.Exercise(Y/N)', 'BP _Systolic (mmHg)', 'BP _Diastolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)', 'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)', 'Endometrium (mm)', 'BMI_a', 'BMI_b', 'BMI_c', 'hypo_s', 'normal_s', 'pre_hyper_s', 'hyper_s', 'abn1', 'abn2', 'nrml'])
        result = model.predict(X)  # [1], [0]
        print(result)
        return Response({'result': result}, status=status.HTTP_200_OK)
