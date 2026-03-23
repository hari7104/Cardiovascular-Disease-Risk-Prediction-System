# Training & Data Processing Roadmap

## 📋 Overview

This document explains the machine learning training pipeline for the Cardiovascular Disease Risk Prediction System. It covers the training data, notebook workflow, and how to execute the training process.

---

## 📂 Training Files Structure

```
├── cvd.ipynb                    # Jupyter Notebook with complete ML pipeline
├── training.py                  # Python script version of cvd.ipynb
└── archive/
    └── cardio_train.csv         # Alternative dataset (70,000 records)
```

---

## 🎯 What Does the Training Pipeline Do?

The training pipeline performs the following steps:

### 1. **Data Collection & Preprocessing**
   - **Dataset Used**: Cleveland Heart Disease dataset from UCI Machine Learning Repository
   - **Features**: 13 medical attributes (age, sex, chest pain type, blood pressure, cholesterol, etc.)
   - **Target**: Binary classification (0 = No disease, 1 = Has disease)
   - **Preprocessing Steps**:
     - Handle missing values (marked as '?')
     - Convert to numeric format
     - Convert multi-class target to binary (0 vs 1-4)
     - Apply StandardScaler for feature normalization

### 2. **Model Training**
   - **Two Models Are Trained**:
     - **XGBoost Classifier**: Gradient boosting decision tree model
     - **Keras ANN**: Artificial Neural Network (Deep Learning)

### 3. **Model Evaluation**
   - Classification reports (precision, recall, F1-score)
   - Confusion matrices visualization
   - ROC curves and AUC scores
   - Feature importance analysis (XGBoost)

### 4. **Hyperparameter Optimization**
   - RandomizedSearchCV for XGBoost tuning
   - Optimizes for **recall** (catching more heart disease cases)
   - 50 random combinations tested with 5-fold cross-validation

### 5. **Model Validation & Testing**
   - **Sanity checks**: Test on healthy vs high-risk patients
   - **Fairness checks**: Evaluate performance across male/female subgroups
   - **API integration test**: Test the FastAPI endpoint

### 6. **Model Export**
   - Save optimized model as `optimized_cvd_model.joblib`
   - Save scaler as `scaler.joblib`
   - Convert to ONNX format: `model.onnx` (for production deployment)
   - Generate metadata JSON with model configuration

---

## 📊 About the Datasets

### **Cleveland Heart Disease Dataset** (Currently Used)
- **Source**: UCI Machine Learning Repository
- **Records**: ~303 patients
- **Features**: 13 medical attributes
- **Target**: Heart disease presence (binary)
- **Format**: Loaded directly from URL in the notebook

#### Feature Descriptions:
| Feature | Description | Type | Range |
|---------|-------------|------|-------|
| `age` | Age in years | Float | 20-100 |
| `sex` | Sex (1 = male, 0 = female) | Int | 0-1 |
| `cp` | Chest pain type (0-3) | Int | 0-3 |
| `trestbps` | Resting blood pressure (mm Hg) | Float | 90-200 |
| `chol` | Serum cholesterol (mg/dl) | Float | 100-600 |
| `fbs` | Fasting blood sugar > 120 mg/dl | Int | 0-1 |
| `restecg` | Resting ECG results (0-2) | Int | 0-2 |
| `thalach` | Maximum heart rate achieved | Float | 70-220 |
| `exang` | Exercise induced angina | Int | 0-1 |
| `oldpeak` | ST depression induced by exercise | Float | 0-6 |
| `slope` | Slope of peak exercise ST segment | Int | 0-2 |
| `ca` | Number of major vessels (0-4) | Int | 0-4 |
| `thal` | Thalassemia status (0-3) | Int | 0-3 |

### **Cardio Train Dataset** (archive/cardio_train.csv) - Not Currently Used
- **Source**: Kaggle Cardiovascular Disease dataset
- **Records**: ~70,000 patients
- **Features**: 12 attributes (different from Cleveland dataset)
- **Format**: CSV file with semicolon separator

#### Feature Descriptions:
| Feature | Description | Example Values |
|---------|-------------|----------------|
| `id` | Patient ID | Unique identifier |
| `age` | Age in **days** | 18393 = ~50 years |
| `gender` | 1 = female, 2 = male | 1-2 |
| `height` | Height in cm | 168 |
| `weight` | Weight in kg | 62.0 |
| `ap_hi` | Systolic blood pressure | 110 |
| `ap_lo` | Diastolic blood pressure | 80 |
| `cholesterol` | 1 = normal, 2 = above normal, 3 = well above normal | 1-3 |
| `gluc` | Glucose level (same scale as cholesterol) | 1-3 |
| `smoke` | Smoking status | 0-1 |
| `alco` | Alcohol intake | 0-1 |
| `active` | Physical activity | 0-1 |
| `cardio` | **Target**: Presence of CVD | 0-1 |

> **Note**: The Cardio Train dataset uses different features and is currently not integrated into the training pipeline. To use it, the preprocessing code in [cvd.ipynb](cvd.ipynb) would need to be modified.

---

## 🚀 How to Run the Training Pipeline

### **Option 1: Using Jupyter Notebook (Recommended)**

#### Prerequisites:
```bash
# Install required packages
pip install pandas numpy scikit-learn xgboost tensorflow matplotlib seaborn joblib
```

#### Steps:
1. **Open the notebook**:
   ```bash
   jupyter notebook cvd.ipynb
   ```
   Or use VS Code with Jupyter extension

2. **Run cells sequentially**:
   - **Cell 1**: Install XGBoost and TensorFlow
   - **Cell 2**: Import libraries
   - **Cell 3**: Load and preprocess data
   - **Cell 4**: Scale features and split dataset
   - **Cell 5**: Train XGBoost model
   - **Cell 6**: Train Keras ANN model
   - **Cells 7-9**: Evaluation and visualization
   - **Cell 10**: Hyperparameter tuning (takes ~5-10 mins)
   - **Cells 11-12**: Model validation tests
   - **Cells 13-17**: ONNX conversion and export

3. **Expected Outputs**:
   - `scaler.joblib` (for feature scaling in production)
   - `optimized_cvd_model.joblib` (trained model)
   - `model.onnx` (ONNX format for deployment)
   - `final_model_metadata.json` (model configuration)

### **Option 2: Using Python Script**

```bash
# Run the training script
python training.py
```

> **Note**: The script version uses Google Colab-specific commands (`!pip install`, `files.download()`). You may need to comment out these lines if running locally.

---

## 🧪 What Happens During Training?

### **Stage 1: Data Loading** (30 seconds)
```
✓ Download Cleveland dataset from UCI
✓ Clean missing values
✓ Convert to binary classification
✓ Display data statistics
```

### **Stage 2: Preprocessing** (5 seconds)
```
✓ Apply StandardScaler
✓ Split into train/test (80/20)
✓ Save scaler for production use
```

### **Stage 3: Initial Model Training** (1-2 minutes)
```
XGBoost Training:
- 100 estimators
- Max depth: 5
- Learning rate: 0.1
- Results: ~85% accuracy

Keras ANN Training:
- Architecture: 128 → 64 → 1 neurons
- 100 epochs with early stopping
- Dropout layers (0.3) to prevent overfitting
- Results: ~80% accuracy
```

### **Stage 4: Hyperparameter Tuning** (5-10 minutes)
```
RandomizedSearchCV:
- 50 random configurations tested
- 5-fold cross-validation
- Optimizing for RECALL (catching disease cases)
- Best model selected automatically
```

### **Stage 5: Validation** (1 minute)
```
✓ Test on synthetic healthy patient
✓ Test on synthetic high-risk patient
✓ Evaluate fairness across gender groups
✓ Compare predictions
```

### **Stage 6: Export** (30 seconds)
```
✓ Save optimized model
✓ Convert to ONNX format
✓ Generate metadata JSON
✓ Verify ONNX conversion
```

**Total Time**: ~15-20 minutes

---

## 📈 Understanding Model Performance

### **Metrics Explained**

1. **Accuracy**: Overall correctness (how many predictions were correct)
2. **Precision**: Of all predicted heart disease cases, how many were actually correct
3. **Recall**: Of all actual heart disease cases, how many did we catch
4. **F1-Score**: Harmonic mean of precision and recall
5. **AUC (Area Under Curve)**: Overall model discrimination ability (0.5 = random, 1.0 = perfect)

### **Why We Optimize for Recall**
In medical diagnosis, **missing a heart disease case is worse than a false positive**, so we prioritize **recall** to catch more disease cases.

---

## 🔧 Key Configuration Files Generated

### 1. **scaler.joblib**
- Contains mean and standard deviation for each feature
- **MUST** be used in production to scale input data
- Without this, predictions will be incorrect

### 2. **optimized_cvd_model.joblib**
- Trained XGBoost model with best hyperparameters
- Used by backend for predictions
- Can load with: `joblib.load('optimized_cvd_model.joblib')`

### 3. **model.onnx**
- ONNX format (Open Neural Network Exchange)
- Portable across different platforms and languages
- Smaller size and faster inference
- Used in production with ONNX Runtime

### 4. **final_model_metadata.json**
- Feature schema (types, ranges, encodings)
- ONNX input/output specifications
- Decision threshold (0.5)
- Sample test data
- Deployment configurations

---

## 🎓 How to Explain This to Others

### **Simple Explanation (Non-Technical)**
> "We train a machine learning model to predict heart disease risk using patient medical data. The model learns patterns from 300+ real patient records, then we test and optimize it to make accurate predictions. Finally, we export it in a format that our web application can use."

### **Technical Explanation**
> "This pipeline implements a binary classification model for cardiovascular disease prediction. We use ensemble methods (XGBoost) and deep learning (ANN) on the Cleveland heart disease dataset. After preprocessing and scaling, we perform hyperparameter optimization using RandomizedSearchCV with 5-fold cross-validation, optimizing for recall. The final model is exported as both Joblib and ONNX formats, with the scaler preserved for production inference."

### **Key Points for Presentations**
1. **Problem**: Predict heart disease risk from medical data
2. **Data**: 303 patients, 13 features from Cleveland dataset
3. **Models**: XGBoost (winner) and Keras ANN
4. **Optimization**: Tuned for maximum recall (catching disease cases)
5. **Validation**: Tested on synthetic cases and fairness across demographics
6. **Deployment**: Exported as ONNX for production use

---

## ❓ Common Questions & Answers

### **Q: Why two models (XGBoost and ANN)?**
A: We compare multiple approaches to find the best performer. XGBoost typically wins on tabular medical data.

### **Q: Why not use the cardio_train.csv dataset?**
A: The Cleveland dataset is more established in research and has the right features for our use case. The cardio dataset could be integrated later for comparison.

### **Q: How long does training take?**
A: Initial training: 2-3 minutes. With hyperparameter tuning: 15-20 minutes total.

### **Q: Can I retrain the model?**
A: Yes! Just run the notebook cells again. You can also modify hyperparameters in the tuning section.

### **Q: What if I want to use different features?**
A: You'd need to modify the data loading section and ensure the feature count matches the model architecture.

### **Q: Why do we need both .joblib and .onnx files?**
A: `.joblib` is for Python-based backends. `.onnx` is for production environments (Node.js, C++, mobile, etc.) and offers faster inference.

---

## 🔄 Training Pipeline Flowchart

```
┌─────────────────────────┐
│  Load Cleveland Dataset │
│  (UCI ML Repository)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Preprocess & Clean     │
│  • Handle missing '?'   │
│  • Convert to binary    │
│  • Scale features       │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Split Train/Test      │
│   (80% / 20%)           │
└───────────┬─────────────┘
            │
            ▼
   ┌────────┴────────┐
   │                 │
   ▼                 ▼
┌──────────┐    ┌──────────┐
│ XGBoost  │    │ Keras    │
│ Training │    │ ANN      │
└────┬─────┘    └────┬─────┘
     │               │
     └───────┬───────┘
             ▼
┌─────────────────────────┐
│   Evaluate & Compare    │
│   • Confusion Matrix    │
│   • ROC/AUC             │
│   • Feature Importance  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Hyperparameter Tuning   │
│ (RandomizedSearchCV)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Validation Tests       │
│  • Sanity checks        │
│  • Fairness checks      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Export Models         │
│   • .joblib             │
│   • .onnx               │
│   • metadata.json       │
└─────────────────────────┘
```

---

## 🛠️ Troubleshooting

### **Issue**: Module not found errors
**Solution**: Install missing packages:
```bash
pip install xgboost tensorflow scikit-learn pandas numpy matplotlib seaborn joblib
```

### **Issue**: Google Colab specific commands fail
**Solution**: Comment out Colab-specific lines:
```python
# from google.colab import files
# files.download('model.joblib')
```

### **Issue**: ONNX conversion fails
**Solution**: Ensure compatible versions:
```bash
pip install onnx==1.17.0 onnxmltools==1.12.0 skl2onnx==1.17.0
```

### **Issue**: Low model performance
**Solution**: 
- Increase `n_iter` in RandomizedSearchCV (line ~220)
- Add more features to the dataset
- Try different hyperparameter ranges

---

## 📚 Next Steps

After training is complete:

1. **Verify Model Files**: Check that all 4 files are generated
   - `scaler.joblib`
   - `optimized_cvd_model.joblib`
   - `model.onnx`
   - `final_model_metadata.json`

2. **Move to Backend**: Copy model files to `backend/models/` directory

3. **Test Backend**: Ensure the backend can load and use the model

4. **Run Predictions**: Test the `/predict` endpoint with sample data

5. **Deploy**: Use Docker to containerize and deploy the full application

---

## 📖 Additional Resources

- **Scikit-learn Documentation**: https://scikit-learn.org/
- **XGBoost Documentation**: https://xgboost.readthedocs.io/
- **TensorFlow/Keras**: https://www.tensorflow.org/
- **ONNX Runtime**: https://onnxruntime.ai/
- **Cleveland Dataset Info**: https://archive.ics.uci.edu/ml/datasets/heart+disease

---

## 📝 Summary

This training pipeline is the **core machine learning component** of your CVD prediction system. It:
- Loads and preprocesses medical data
- Trains and compares multiple models
- Optimizes for maximum disease detection (recall)
- Validates across different patient groups
- Exports production-ready model files

**Remember**: The training only needs to be done once (or when you want to update the model with new data). The saved model files are used by the backend for predictions.

---

**Last Updated**: March 4, 2026  
**Maintainer**: Cardiovascular Disease Prediction System Team
