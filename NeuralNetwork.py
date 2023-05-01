import numpy as np

# activation function
sigmoid = lambda z : 1.0 / (1.0 + np.exp(-z))

# Neural Network class def
class NeuralNetwork:
    def __init__(
        self,
        input_nodes,
        hidden_nodes,
        output_nodes,
        learningRate = 0.1,
        activation_function = sigmoid,
    ):
        # nodes for the neural network
        self.inodes = input_nodes
        self.hnodes = hidden_nodes
        self.onodes = output_nodes

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

    def train(self, inputs, train_data):
        init_inputs = np.array(inputs, ndmin=2).T
        target_outputs = np.array(train_data, ndmin=2).T

        hidden_inputs = np.dot(self.wih, init_inputs)
        hidden_outputs = self.activation_function(hidden_inputs)

        output_inputs = np.dot(self.who, hidden_outputs)
        output_outputs = self.activation_function(output_inputs)

        # backpropagating errors
        # output layer error, for simplicity: target - actual
        output_errors = target_outputs - output_outputs
        # hidden layer error, errors are dependent on the weights
        hidden_errors = np.dot(self.who.T, output_errors)

        # updating weights based on errors
        self.who += self.lr * np.dot((output_errors * output_outputs * (1.0 - output_outputs)), np.transpose(hidden_outputs))
        self.wih += self.lr * np.dot((hidden_errors * hidden_outputs * (1.0 - hidden_outputs)), np.transpose(init_inputs))
        
    
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
