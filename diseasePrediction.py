import numpy as np
import pandas as pd
import sys
from scipy.stats import mode
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from symptom_precautions import *
# print(sys.argv[1])
data = pd.read_csv("Training.csv").dropna(axis=1)
disease_counts = data["prognosis"].value_counts()
temp_df = pd.DataFrame({
    "Disease": disease_counts.index,
    "Counts": disease_counts.values
})

encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])

X = data.iloc[:, :-1]
y = data.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split( X, y, test_size=0.2, random_state=24)


def cv_scoring(estimator, X, y):
    return accuracy_score(y, estimator.predict(X))



models = {
    "Gaussian NB": GaussianNB(),
    "Random Forest": RandomForestClassifier(random_state=18)
}

nb_model = GaussianNB()
nb_model.fit(X_train, y_train)



rf_model = RandomForestClassifier(random_state=18)
rf_model.fit(X_train, y_train)


final_nb_model = GaussianNB()
final_rf_model = RandomForestClassifier(random_state=18)
final_nb_model.fit(X, y)
final_rf_model.fit(X, y)


test_data = pd.read_csv("Testing.csv").dropna(axis=1)


test_X = test_data.iloc[:, :-1]
test_Y = encoder.transform(test_data.iloc[:, -1])



nb_preds = final_nb_model.predict(test_X)
rf_preds = final_rf_model.predict(test_X)
final_preds = [mode([j, k])[0][0] for  j, k in zip(nb_preds, rf_preds)]
# print(final_preds)
symptoms = X.columns.values
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
#     print(symptom)
    symptom_index[symptom] = index

data_dict = {
    "symptom_index": symptom_index,
    "predictions_classes": encoder.classes_
}

def predictDisease(symptoms):
    symptoms = symptoms.split(",")
#     print(symptoms)

    input_data = [0] * len(data_dict["symptom_index"])
#     print(symptom_index)
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_data[index] = 1
    input_data = np.array(input_data).reshape(1, -1)
    rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
    final_prediction = mode([rf_prediction, nb_prediction])[0][0]
    x=0
    for i in range(len(precautions)):
        if(final_prediction== precautions[i][0]):
            x+=i
            break
    print(final_prediction)

    print("1) ",precautions[x][1])
    print("2) ",precautions[x][2])
    print("3) ",precautions[x][3])
    print("4) ",precautions[x][4])

    return  final_prediction
predictDisease("High Fever,Cough,Headache")