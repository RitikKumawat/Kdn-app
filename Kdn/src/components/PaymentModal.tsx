import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {paymentMode: string; amount: string}) => void;
  isPending: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isPending,
}) => {
  const [paymentMode, setPaymentMode] = useState<string>(''); // Payment mode state
  const [amount, setAmount] = useState<string>(''); // Amount state
  const [error, setError] = useState<string>(''); // Validation error

  const handleSubmission = () => {
    if (!paymentMode || !amount) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    onSubmit({paymentMode, amount});
    setPaymentMode('');
    setAmount('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Collect Payment</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Text style={styles.label}>Payment Mode</Text>
          <Picker
            selectedValue={paymentMode}
            onValueChange={itemValue => setPaymentMode(itemValue)}
            style={[styles.picker, {color: paymentMode ? 'black' : 'gray'}]}
            dropdownIconColor="black">
            <Picker.Item label="Select Payment Mode" value="" enabled={false} />
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Online" value="Online" />
          </Picker>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor:
                    isPending || !paymentMode || !amount ? 'gray' : 'black',
                },
              ]}
              onPress={handleSubmission}
              disabled={isPending || !paymentMode || !amount}>
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.modalButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'black',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
