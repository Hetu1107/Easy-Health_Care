import numpy as np
import pandas as pd
import sys

n = int(sys.argv[1])
b = int(sys.argv[2])
c = int(sys.argv[3])

data = pd.read_csv('./appointment.txt', header=None)
# print(data.head(5))

# print(data.size)

X = np.array(data.iloc[1:, 0:5]).astype(float)

# print(X[0:5])

y = np.array(data.iloc[1:, 5]).astype(float)
# print(y)

a = np.array(data.iloc[1:, 0]).astype(float)
# print(a)


m = len(y)
# print(m)

ones = np.ones((m))
X = np.column_stack((ones, X))

# print(X[0:5])

tp = X.transpose()

theta = np.dot(np.dot(np.linalg.inv(np.dot(tp, X)), tp), y)
# print(theta)

predict1 = np.dot(theta, [[1], [n], [b], [c], [b*b], [c*c]])
print(predict1[0])
