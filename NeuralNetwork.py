import numpy as np

# Neural Network class def
class NeuralNetwork:
    def __init__(
        self,
        inputNodes,
        hiddenNodes,
        outputNodes,
        learningRate,
        activation_function,
    ):
        # nodes for the neural network
        self.inodes = inputNodes
        self.hnodes = hiddenNodes
        self.onodes = outputNodes

        # learning rate
        self.lr = learningRate

        # weights for input nodes to hidden nodes
        # using normal distribution to initialize random weights
        # self.wih = np.random.rand(self.inodes, self.hnodes) - 0.5
        self.wih = np.random.normal(
            0.0, self.hnodes ** (-0.5), (self.hnodes, self.inodes)
        )
        # weights for hidden nodes to output nodes
        # self.who = np.random.rand(self.hnodes, self.onodes) - 0.5
        self.who = np.random.normal(
            0.0, self.onodes ** (-0.5), (self.onodes, self.hnodes)
        )

        self.activation_function = activation_function

    def train():
        pass

    def query(self, inputs):
        # inital inputs, convert it into 2d matrix
        init_inputs = np.array(inputs, ndmin=2).T
        # calculate the inputs for the hidden nodes
        hidden_inputs = np.dot(self.wih, init_inputs)
        # calculate output for the hidden node using the activation function
        hidden_outputs = self.activation_function(hidden_inputs)
        # calculate inputs for the output nodes
        output_inputs = np.dot(self.who, hidden_outputs)
        # calculate outputs for the output node
        output_outputs = self.activation_function(output_inputs)

        return output_outputs

# activation function
def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

# testing
# inodes = 3
# hnodes = 3
# onodes = 3

# lr = 0.1

# neural_network = NeuralNetwork(inodes, hnodes, onodes, lr, sigmoid)

# output = neural_network.query([1.0, -0.5, 1.5])

# print(output)
