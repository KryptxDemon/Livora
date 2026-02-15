import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressStepsProps {
  steps: number;
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: steps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.step,
                  isCompleted && styles.completedStep,
                  isCurrent && styles.currentStep,
                ]}
              >
                <Text
                  style={[
                    styles.stepText,
                    (isCompleted || isCurrent) && styles.activeStepText,
                  ]}
                >
                  {isCompleted ? '✓' : stepNumber}
                </Text>
              </View>
              {index < steps - 1 && (
                <View
                  style={[
                    styles.connector,
                    isCompleted && styles.completedConnector,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStep: {
    backgroundColor: '#4CAF50',
  },
  currentStep: {
    backgroundColor: '#2E7D32',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#757575',
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  connector: {
    width: 24,
    height: 3,
    backgroundColor: '#E0E0E0',
  },
  completedConnector: {
    backgroundColor: '#4CAF50',
  },
});
