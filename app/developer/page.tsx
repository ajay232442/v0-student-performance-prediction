'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Code2,
  Database,
  Brain,
  Plug,
  Shield,
  Zap,
  Copy,
  Check,
  FileCode,
  GitBranch,
  Server,
  Cpu,
  Network,
  Lock,
} from 'lucide-react'

const codeExamples = {
  dataProcessing: {
    title: 'Data Processing Pipeline',
    description: 'ETL pipeline for ingesting and processing student data from multiple sources',
    language: 'python',
    code: `"""
EduPredict AI - Data Processing Pipeline
Handles ETL operations for student performance data
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DataSource(Enum):
    """Supported data source types"""
    SIS = "student_information_system"
    LMS = "learning_management_system"
    ATTENDANCE = "attendance_system"
    ASSESSMENT = "assessment_platform"
    FINANCIAL = "financial_aid_system"


@dataclass
class StudentRecord:
    """Unified student record structure"""
    student_id: str
    first_name: str
    last_name: str
    grade_level: int
    gpa: float
    attendance_rate: float
    engagement_score: float
    socioeconomic_factors: Dict
    created_at: datetime
    updated_at: datetime


class DataIngestionPipeline:
    """
    Main data ingestion pipeline for processing student data
    from multiple educational system sources.
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.validators = []
        self.transformers = []
        
    def connect_source(self, source: DataSource, credentials: Dict) -> bool:
        """Establish connection to a data source"""
        logger.info(f"Connecting to {source.value}...")
        # Connection logic here
        return True
    
    def extract_sis_data(self, date_range: tuple) -> pd.DataFrame:
        """Extract student information system data"""
        query = """
        SELECT 
            student_id,
            first_name,
            last_name,
            grade_level,
            enrollment_date,
            demographic_data,
            guardian_info
        FROM students
        WHERE updated_at BETWEEN %s AND %s
        """
        # Execute query and return DataFrame
        logger.info(f"Extracted SIS data for date range: {date_range}")
        return pd.DataFrame()
    
    def extract_lms_engagement(self, student_ids: List[str]) -> pd.DataFrame:
        """Extract LMS engagement metrics"""
        query = """
        SELECT 
            student_id,
            course_id,
            login_count,
            time_on_task,
            assignments_submitted,
            discussion_posts,
            resource_views,
            last_activity_date
        FROM lms_engagement
        WHERE student_id IN %s
        AND activity_date >= CURRENT_DATE - INTERVAL '30 days'
        """
        logger.info(f"Extracted LMS data for {len(student_ids)} students")
        return pd.DataFrame()
    
    def extract_attendance(self, student_ids: List[str]) -> pd.DataFrame:
        """Extract attendance records"""
        query = """
        SELECT 
            student_id,
            attendance_date,
            status,  -- present, absent, tardy, excused
            period,
            course_id
        FROM attendance_records
        WHERE student_id IN %s
        AND attendance_date >= CURRENT_DATE - INTERVAL '90 days'
        """
        return pd.DataFrame()
    
    def extract_assessments(self, student_ids: List[str]) -> pd.DataFrame:
        """Extract assessment and grade data"""
        query = """
        SELECT 
            student_id,
            assessment_id,
            assessment_type,
            subject,
            score,
            max_score,
            assessment_date,
            standards_met
        FROM assessment_results
        WHERE student_id IN %s
        """
        return pd.DataFrame()


class DataTransformer:
    """Transform and normalize data for ML pipeline"""
    
    @staticmethod
    def calculate_attendance_rate(df: pd.DataFrame) -> pd.Series:
        """Calculate attendance rate from raw attendance data"""
        attendance_summary = df.groupby('student_id').agg({
            'status': lambda x: (x == 'present').sum() / len(x) * 100
        })
        return attendance_summary['status']
    
    @staticmethod
    def calculate_engagement_score(df: pd.DataFrame) -> pd.Series:
        """
        Calculate composite engagement score from LMS metrics
        Weighted average of multiple engagement indicators
        """
        weights = {
            'login_frequency': 0.15,
            'time_on_task': 0.25,
            'assignment_completion': 0.30,
            'discussion_participation': 0.15,
            'resource_utilization': 0.15
        }
        
        # Normalize each metric to 0-100 scale
        normalized = df.copy()
        for col in weights.keys():
            if col in normalized.columns:
                min_val = normalized[col].min()
                max_val = normalized[col].max()
                if max_val > min_val:
                    normalized[col] = (
                        (normalized[col] - min_val) / (max_val - min_val) * 100
                    )
        
        # Calculate weighted score
        engagement_score = sum(
            normalized.get(col, 0) * weight 
            for col, weight in weights.items()
        )
        
        return engagement_score
    
    @staticmethod
    def compute_gpa(grades_df: pd.DataFrame) -> pd.Series:
        """Compute GPA from assessment scores"""
        grade_points = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        }
        
        def score_to_grade(score):
            if score >= 93: return 'A'
            elif score >= 90: return 'A-'
            elif score >= 87: return 'B+'
            elif score >= 83: return 'B'
            elif score >= 80: return 'B-'
            elif score >= 77: return 'C+'
            elif score >= 73: return 'C'
            elif score >= 70: return 'C-'
            elif score >= 67: return 'D+'
            elif score >= 63: return 'D'
            elif score >= 60: return 'D-'
            else: return 'F'
        
        grades_df['letter_grade'] = grades_df['percentage'].apply(score_to_grade)
        grades_df['grade_points'] = grades_df['letter_grade'].map(grade_points)
        
        gpa = grades_df.groupby('student_id')['grade_points'].mean()
        return gpa
    
    @staticmethod
    def encode_socioeconomic_factors(df: pd.DataFrame) -> pd.DataFrame:
        """Encode socioeconomic factors for ML model"""
        encoded = pd.DataFrame()
        
        # Binary encoding
        encoded['free_reduced_lunch'] = df['lunch_status'].isin(
            ['free', 'reduced']
        ).astype(int)
        encoded['first_generation'] = df['parent_education'].apply(
            lambda x: 1 if x in ['high_school', 'none'] else 0
        )
        encoded['english_learner'] = (df['ell_status'] == True).astype(int)
        
        # Ordinal encoding for income brackets
        income_map = {
            'low': 1, 'lower_middle': 2, 
            'middle': 3, 'upper_middle': 4, 'high': 5
        }
        encoded['income_bracket'] = df['household_income'].map(income_map)
        
        return encoded


class DataValidator:
    """Validate data quality and integrity"""
    
    @staticmethod
    def check_completeness(df: pd.DataFrame, required_cols: List[str]) -> Dict:
        """Check for missing required fields"""
        results = {}
        for col in required_cols:
            if col in df.columns:
                missing_pct = df[col].isna().sum() / len(df) * 100
                results[col] = {
                    'missing_count': df[col].isna().sum(),
                    'missing_percentage': round(missing_pct, 2),
                    'valid': missing_pct < 5  # 5% threshold
                }
        return results
    
    @staticmethod
    def detect_anomalies(df: pd.DataFrame, numeric_cols: List[str]) -> Dict:
        """Detect statistical anomalies using IQR method"""
        anomalies = {}
        for col in numeric_cols:
            if col in df.columns and df[col].dtype in ['int64', 'float64']:
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                
                outliers = df[
                    (df[col] < lower_bound) | (df[col] > upper_bound)
                ]
                
                anomalies[col] = {
                    'outlier_count': len(outliers),
                    'lower_bound': lower_bound,
                    'upper_bound': upper_bound
                }
        return anomalies
    
    @staticmethod
    def validate_ranges(df: pd.DataFrame) -> List[str]:
        """Validate data falls within expected ranges"""
        errors = []
        
        if 'gpa' in df.columns:
            invalid_gpa = df[(df['gpa'] < 0) | (df['gpa'] > 4.0)]
            if len(invalid_gpa) > 0:
                errors.append(f"Invalid GPA values: {len(invalid_gpa)} records")
        
        if 'attendance_rate' in df.columns:
            invalid_att = df[
                (df['attendance_rate'] < 0) | (df['attendance_rate'] > 100)
            ]
            if len(invalid_att) > 0:
                errors.append(
                    f"Invalid attendance rates: {len(invalid_att)} records"
                )
        
        return errors


# Example usage
if __name__ == "__main__":
    # Initialize pipeline
    config = {
        'batch_size': 1000,
        'parallel_workers': 4,
        'retry_attempts': 3
    }
    
    pipeline = DataIngestionPipeline(config)
    transformer = DataTransformer()
    validator = DataValidator()
    
    # Extract data from sources
    sis_data = pipeline.extract_sis_data(
        (datetime.now() - timedelta(days=30), datetime.now())
    )
    
    # Validate and transform
    validation_results = validator.check_completeness(
        sis_data, 
        ['student_id', 'grade_level', 'enrollment_date']
    )
    
    logger.info(f"Validation results: {validation_results}")`,
  },
  predictiveModel: {
    title: 'Predictive ML Model',
    description: 'Machine learning model for predicting student risk levels and outcomes',
    language: 'python',
    code: `"""
EduPredict AI - Predictive Modeling Engine
ML models for student performance prediction and risk assessment
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import (
    RandomForestClassifier, 
    GradientBoostingClassifier,
    VotingClassifier
)
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import (
    classification_report, 
    confusion_matrix,
    roc_auc_score,
    precision_recall_curve
)
from sklearn.calibration import CalibratedClassifierCV
import xgboost as xgb
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
import joblib
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class PredictionResult:
    """Container for prediction results"""
    student_id: str
    risk_level: str  # 'low', 'medium', 'high', 'critical'
    risk_score: float  # 0-100
    confidence: float  # 0-1
    contributing_factors: Dict[str, float]
    recommended_interventions: List[str]


class FeatureEngineering:
    """Feature engineering for student performance prediction"""
    
    @staticmethod
    def create_temporal_features(df: pd.DataFrame) -> pd.DataFrame:
        """Create time-based features from historical data"""
        features = df.copy()
        
        # Rolling averages
        features['gpa_30d_avg'] = df.groupby('student_id')['gpa'].transform(
            lambda x: x.rolling(window=30, min_periods=1).mean()
        )
        features['attendance_7d_avg'] = df.groupby('student_id')['attendance'].transform(
            lambda x: x.rolling(window=7, min_periods=1).mean()
        )
        
        # Trend indicators
        features['gpa_trend'] = df.groupby('student_id')['gpa'].transform(
            lambda x: x.diff().rolling(window=7).mean()
        )
        features['engagement_trend'] = df.groupby('student_id')['engagement'].transform(
            lambda x: x.diff().rolling(window=7).mean()
        )
        
        # Volatility measures
        features['gpa_volatility'] = df.groupby('student_id')['gpa'].transform(
            lambda x: x.rolling(window=30).std()
        )
        
        return features
    
    @staticmethod
    def create_behavioral_features(df: pd.DataFrame) -> pd.DataFrame:
        """Create behavioral pattern features"""
        features = df.copy()
        
        # Assignment submission patterns
        features['late_submission_rate'] = (
            df['late_submissions'] / df['total_submissions'].clip(lower=1)
        )
        features['assignment_completion_rate'] = (
            df['completed_assignments'] / df['total_assignments'].clip(lower=1)
        )
        
        # Engagement patterns
        features['avg_session_duration'] = df['total_time'] / df['login_count'].clip(lower=1)
        features['resource_utilization'] = (
            df['resources_accessed'] / df['resources_available'].clip(lower=1)
        )
        
        # Social learning indicators
        features['peer_interaction_score'] = (
            df['discussion_posts'] * 0.4 +
            df['peer_replies'] * 0.3 +
            df['group_activities'] * 0.3
        )
        
        return features
    
    @staticmethod
    def create_risk_indicators(df: pd.DataFrame) -> pd.DataFrame:
        """Create composite risk indicator features"""
        features = df.copy()
        
        # Academic risk score
        features['academic_risk'] = (
            (4.0 - df['gpa']) / 4.0 * 40 +  # GPA component
            (100 - df['avg_grade']) / 100 * 30 +  # Grade component
            df['failing_classes'] * 10  # Failing classes
        ).clip(0, 100)
        
        # Attendance risk score
        features['attendance_risk'] = (
            (100 - df['attendance_rate']) * 0.5 +
            df['consecutive_absences'] * 5 +
            df['tardy_count'] * 2
        ).clip(0, 100)
        
        # Engagement risk score
        features['engagement_risk'] = (
            (100 - df['engagement_score']) * 0.4 +
            (100 - df['assignment_completion_rate'] * 100) * 0.3 +
            df['days_since_last_login'] * 2
        ).clip(0, 100)
        
        # Socioeconomic risk factors
        features['socioeconomic_risk'] = (
            df['free_reduced_lunch'] * 15 +
            df['first_generation'] * 10 +
            df['english_learner'] * 10 +
            (5 - df['income_bracket']) * 5
        ).clip(0, 50)
        
        return features


class StudentRiskPredictor:
    """
    Ensemble model for predicting student risk levels
    Uses multiple algorithms for robust predictions
    """
    
    def __init__(self, model_config: Optional[Dict] = None):
        self.config = model_config or {}
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.models = {}
        self.ensemble = None
        self.feature_importance = {}
        self.is_trained = False
        
    def _build_models(self) -> Dict:
        """Build individual models for ensemble"""
        models = {
            'random_forest': RandomForestClassifier(
                n_estimators=200,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                class_weight='balanced',
                random_state=42,
                n_jobs=-1
            ),
            'xgboost': xgb.XGBClassifier(
                n_estimators=200,
                max_depth=10,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                scale_pos_weight=2,
                random_state=42,
                use_label_encoder=False,
                eval_metric='mlogloss'
            ),
            'gradient_boosting': GradientBoostingClassifier(
                n_estimators=150,
                max_depth=8,
                learning_rate=0.1,
                subsample=0.8,
                random_state=42
            ),
            'neural_network': MLPClassifier(
                hidden_layer_sizes=(128, 64, 32),
                activation='relu',
                solver='adam',
                alpha=0.001,
                batch_size=64,
                learning_rate='adaptive',
                max_iter=500,
                random_state=42
            )
        }
        return models
    
    def train(
        self, 
        X: pd.DataFrame, 
        y: pd.Series,
        validation_split: float = 0.2
    ) -> Dict:
        """Train the ensemble model"""
        logger.info("Starting model training...")
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(
            X, y_encoded, 
            test_size=validation_split, 
            stratify=y_encoded,
            random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self.scaler.transform(X_val)
        
        # Build and train individual models
        self.models = self._build_models()
        model_scores = {}
        
        for name, model in self.models.items():
            logger.info(f"Training {name}...")
            model.fit(X_train_scaled, y_train)
            
            # Evaluate
            val_pred = model.predict(X_val_scaled)
            val_proba = model.predict_proba(X_val_scaled)
            
            accuracy = (val_pred == y_val).mean()
            auc = roc_auc_score(y_val, val_proba, multi_class='ovr')
            
            model_scores[name] = {
                'accuracy': accuracy,
                'auc_roc': auc
            }
            logger.info(f"{name} - Accuracy: {accuracy:.4f}, AUC: {auc:.4f}")
        
        # Build ensemble with calibration
        calibrated_models = []
        for name, model in self.models.items():
            calibrated = CalibratedClassifierCV(model, cv='prefit')
            calibrated.fit(X_val_scaled, y_val)
            calibrated_models.append((name, calibrated))
        
        self.ensemble = VotingClassifier(
            estimators=calibrated_models,
            voting='soft',
            weights=[1.2, 1.5, 1.0, 0.8]  # XGBoost weighted higher
        )
        
        # Fit ensemble on full training data
        X_full_scaled = self.scaler.fit_transform(X)
        self.ensemble.fit(X_full_scaled, y_encoded)
        
        # Calculate feature importance
        self._calculate_feature_importance(X.columns, X_train_scaled, y_train)
        
        self.is_trained = True
        
        return {
            'individual_models': model_scores,
            'feature_importance': dict(
                sorted(
                    self.feature_importance.items(), 
                    key=lambda x: x[1], 
                    reverse=True
                )[:10]
            )
        }
    
    def _calculate_feature_importance(
        self, 
        feature_names: List[str],
        X: np.ndarray,
        y: np.ndarray
    ):
        """Calculate aggregated feature importance"""
        importance_scores = np.zeros(len(feature_names))
        
        # Random Forest importance
        rf_importance = self.models['random_forest'].feature_importances_
        importance_scores += rf_importance * 0.3
        
        # XGBoost importance
        xgb_importance = self.models['xgboost'].feature_importances_
        importance_scores += xgb_importance * 0.4
        
        # Gradient Boosting importance
        gb_importance = self.models['gradient_boosting'].feature_importances_
        importance_scores += gb_importance * 0.3
        
        self.feature_importance = dict(zip(feature_names, importance_scores))
    
    def predict(self, X: pd.DataFrame) -> List[PredictionResult]:
        """Generate predictions for students"""
        if not self.is_trained:
            raise ValueError("Model must be trained before prediction")
        
        X_scaled = self.scaler.transform(X)
        
        # Get predictions and probabilities
        predictions = self.ensemble.predict(X_scaled)
        probabilities = self.ensemble.predict_proba(X_scaled)
        
        results = []
        risk_levels = self.label_encoder.classes_
        
        for i, (pred, proba) in enumerate(zip(predictions, probabilities)):
            risk_level = risk_levels[pred]
            risk_score = self._calculate_risk_score(proba, risk_levels)
            confidence = float(proba.max())
            
            # Get contributing factors for this prediction
            factors = self._get_contributing_factors(X.iloc[i])
            
            # Get intervention recommendations
            interventions = self._recommend_interventions(
                risk_level, 
                factors,
                X.iloc[i]
            )
            
            results.append(PredictionResult(
                student_id=str(X.index[i]) if hasattr(X, 'index') else f"student_{i}",
                risk_level=risk_level,
                risk_score=risk_score,
                confidence=confidence,
                contributing_factors=factors,
                recommended_interventions=interventions
            ))
        
        return results
    
    def _calculate_risk_score(
        self, 
        probabilities: np.ndarray,
        risk_levels: np.ndarray
    ) -> float:
        """Calculate 0-100 risk score from probabilities"""
        risk_weights = {'low': 0, 'medium': 33, 'high': 66, 'critical': 100}
        
        score = sum(
            prob * risk_weights.get(level, 50)
            for prob, level in zip(probabilities, risk_levels)
        )
        
        return round(min(100, max(0, score)), 1)
    
    def _get_contributing_factors(self, student_data: pd.Series) -> Dict[str, float]:
        """Identify top contributing factors for a prediction"""
        factors = {}
        
        for feature, importance in sorted(
            self.feature_importance.items(),
            key=lambda x: x[1],
            reverse=True
        )[:5]:
            if feature in student_data.index:
                # Normalize contribution
                value = student_data[feature]
                factors[feature] = round(float(importance * 100), 1)
        
        return factors
    
    def _recommend_interventions(
        self,
        risk_level: str,
        factors: Dict[str, float],
        student_data: pd.Series
    ) -> List[str]:
        """Recommend interventions based on risk factors"""
        interventions = []
        
        # Academic interventions
        if 'academic_risk' in factors or student_data.get('gpa', 4.0) < 2.0:
            interventions.append('one_on_one_tutoring')
            if student_data.get('failing_classes', 0) > 0:
                interventions.append('academic_recovery_program')
        
        # Attendance interventions
        if 'attendance_risk' in factors or student_data.get('attendance_rate', 100) < 85:
            interventions.append('attendance_intervention')
            if student_data.get('consecutive_absences', 0) > 3:
                interventions.append('home_visit')
        
        # Engagement interventions
        if 'engagement_risk' in factors or student_data.get('engagement_score', 100) < 50:
            interventions.append('peer_mentoring')
            interventions.append('study_skills_workshop')
        
        # Socioeconomic support
        if 'socioeconomic_risk' in factors:
            if student_data.get('free_reduced_lunch', False):
                interventions.append('resource_assistance')
            if student_data.get('first_generation', False):
                interventions.append('college_prep_program')
        
        # Critical level always gets counseling
        if risk_level == 'critical':
            interventions.insert(0, 'counselor_intervention')
            interventions.append('parent_conference')
        
        return list(set(interventions))[:5]
    
    def save_model(self, path: str):
        """Save trained model to disk"""
        model_data = {
            'ensemble': self.ensemble,
            'scaler': self.scaler,
            'label_encoder': self.label_encoder,
            'feature_importance': self.feature_importance,
            'config': self.config
        }
        joblib.dump(model_data, path)
        logger.info(f"Model saved to {path}")
    
    @classmethod
    def load_model(cls, path: str) -> 'StudentRiskPredictor':
        """Load trained model from disk"""
        model_data = joblib.load(path)
        
        predictor = cls(model_data['config'])
        predictor.ensemble = model_data['ensemble']
        predictor.scaler = model_data['scaler']
        predictor.label_encoder = model_data['label_encoder']
        predictor.feature_importance = model_data['feature_importance']
        predictor.is_trained = True
        
        logger.info(f"Model loaded from {path}")
        return predictor


class ModelEvaluator:
    """Evaluate and monitor model performance"""
    
    @staticmethod
    def evaluate_model(
        model: StudentRiskPredictor,
        X_test: pd.DataFrame,
        y_test: pd.Series
    ) -> Dict:
        """Comprehensive model evaluation"""
        predictions = model.predict(X_test)
        y_pred = [p.risk_level for p in predictions]
        y_scores = [p.risk_score for p in predictions]
        
        # Classification report
        report = classification_report(y_test, y_pred, output_dict=True)
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        
        # Risk score correlation
        correlation = np.corrcoef(
            model.label_encoder.transform(y_test),
            y_scores
        )[0, 1]
        
        return {
            'classification_report': report,
            'confusion_matrix': cm.tolist(),
            'risk_score_correlation': correlation,
            'accuracy': report['accuracy'],
            'weighted_f1': report['weighted avg']['f1-score']
        }


# Example usage
if __name__ == "__main__":
    # Simulated training data
    np.random.seed(42)
    n_samples = 1000
    
    # Generate synthetic features
    X = pd.DataFrame({
        'gpa': np.random.uniform(1.0, 4.0, n_samples),
        'attendance_rate': np.random.uniform(60, 100, n_samples),
        'engagement_score': np.random.uniform(30, 100, n_samples),
        'academic_risk': np.random.uniform(0, 100, n_samples),
        'attendance_risk': np.random.uniform(0, 100, n_samples),
        'engagement_risk': np.random.uniform(0, 100, n_samples),
        'socioeconomic_risk': np.random.uniform(0, 50, n_samples),
        'gpa_trend': np.random.uniform(-0.5, 0.5, n_samples),
        'late_submission_rate': np.random.uniform(0, 0.5, n_samples),
        'peer_interaction_score': np.random.uniform(0, 100, n_samples)
    })
    
    # Generate labels based on features
    risk_score = (
        X['academic_risk'] * 0.35 +
        X['attendance_risk'] * 0.25 +
        X['engagement_risk'] * 0.25 +
        X['socioeconomic_risk'] * 0.15
    )
    
    y = pd.cut(
        risk_score,
        bins=[0, 25, 50, 75, 100],
        labels=['low', 'medium', 'high', 'critical']
    )
    
    # Train model
    predictor = StudentRiskPredictor()
    training_results = predictor.train(X, y)
    
    logger.info(f"Training complete: {training_results}")
    
    # Make predictions
    test_student = X.iloc[:5]
    predictions = predictor.predict(test_student)
    
    for pred in predictions:
        logger.info(
            f"Student {pred.student_id}: {pred.risk_level} "
            f"(score: {pred.risk_score}, confidence: {pred.confidence:.2f})"
        )`,
  },
  apiIntegration: {
    title: 'LMS Integration API',
    description: 'REST API integration for Learning Management Systems and external services',
    language: 'python',
    code: `"""
EduPredict AI - LMS Integration Module
Connectors for Canvas, Blackboard, Moodle, and other LMS platforms
"""

import aiohttp
import asyncio
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from dataclasses import dataclass
import jwt
import hashlib
import hmac
import json
import logging
from enum import Enum

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class LMSPlatform(Enum):
    """Supported LMS platforms"""
    CANVAS = "canvas"
    BLACKBOARD = "blackboard"
    MOODLE = "moodle"
    GOOGLE_CLASSROOM = "google_classroom"
    POWERSCHOOL = "powerschool"
    SCHOOLOGY = "schoology"


@dataclass
class LMSCredentials:
    """LMS API credentials"""
    platform: LMSPlatform
    base_url: str
    api_key: str
    api_secret: Optional[str] = None
    oauth_token: Optional[str] = None
    refresh_token: Optional[str] = None
    token_expiry: Optional[datetime] = None


@dataclass
class StudentEngagement:
    """Standardized student engagement data"""
    student_id: str
    course_id: str
    login_count: int
    total_time_minutes: float
    assignments_submitted: int
    assignments_total: int
    discussions_participated: int
    resources_viewed: int
    last_activity: datetime
    grades: Dict[str, float]


class LMSConnector(ABC):
    """Abstract base class for LMS connectors"""
    
    def __init__(self, credentials: LMSCredentials):
        self.credentials = credentials
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    @abstractmethod
    async def authenticate(self) -> bool:
        """Authenticate with the LMS"""
        pass
    
    @abstractmethod
    async def get_students(self, course_id: str) -> List[Dict]:
        """Get list of students in a course"""
        pass
    
    @abstractmethod
    async def get_engagement_data(
        self, 
        student_id: str,
        course_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> StudentEngagement:
        """Get engagement metrics for a student"""
        pass
    
    @abstractmethod
    async def get_grades(self, student_id: str, course_id: str) -> Dict:
        """Get student grades"""
        pass
    
    @abstractmethod
    async def get_attendance(
        self,
        student_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> List[Dict]:
        """Get attendance records"""
        pass


class CanvasConnector(LMSConnector):
    """Canvas LMS API connector"""
    
    def __init__(self, credentials: LMSCredentials):
        super().__init__(credentials)
        self.api_version = "v1"
    
    def _get_headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.credentials.api_key}",
            "Content-Type": "application/json"
        }
    
    async def authenticate(self) -> bool:
        """Verify API token is valid"""
        url = f"{self.credentials.base_url}/api/{self.api_version}/users/self"
        
        async with self.session.get(url, headers=self._get_headers()) as resp:
            if resp.status == 200:
                logger.info("Canvas authentication successful")
                return True
            else:
                logger.error(f"Canvas auth failed: {resp.status}")
                return False
    
    async def get_students(self, course_id: str) -> List[Dict]:
        """Get all students enrolled in a course"""
        url = f"{self.credentials.base_url}/api/{self.api_version}/courses/{course_id}/users"
        params = {
            "enrollment_type[]": "student",
            "include[]": ["email", "enrollments", "avatar_url"],
            "per_page": 100
        }
        
        students = []
        async with self.session.get(
            url, 
            headers=self._get_headers(),
            params=params
        ) as resp:
            if resp.status == 200:
                students = await resp.json()
        
        return students
    
    async def get_engagement_data(
        self,
        student_id: str,
        course_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> StudentEngagement:
        """Fetch comprehensive engagement data from Canvas"""
        
        # Get analytics data
        analytics_url = (
            f"{self.credentials.base_url}/api/{self.api_version}"
            f"/courses/{course_id}/analytics/users/{student_id}/activity"
        )
        
        async with self.session.get(
            analytics_url, 
            headers=self._get_headers()
        ) as resp:
            activity_data = await resp.json() if resp.status == 200 else {}
        
        # Get submission data
        submissions_url = (
            f"{self.credentials.base_url}/api/{self.api_version}"
            f"/courses/{course_id}/students/submissions"
        )
        params = {
            "student_ids[]": student_id,
            "include[]": ["assignment", "submission_history"]
        }
        
        async with self.session.get(
            submissions_url,
            headers=self._get_headers(),
            params=params
        ) as resp:
            submissions = await resp.json() if resp.status == 200 else []
        
        # Get discussion participation
        discussions_url = (
            f"{self.credentials.base_url}/api/{self.api_version}"
            f"/courses/{course_id}/discussion_topics"
        )
        
        async with self.session.get(
            discussions_url,
            headers=self._get_headers()
        ) as resp:
            discussions = await resp.json() if resp.status == 200 else []
        
        # Count participation
        discussion_count = sum(
            1 for d in discussions 
            if d.get('user_has_posted', False)
        )
        
        # Process submissions
        submitted = sum(
            1 for s in submissions 
            if s.get('workflow_state') == 'submitted'
        )
        
        # Get grades
        grades = {}
        for sub in submissions:
            if sub.get('score') is not None:
                assignment_name = sub.get('assignment', {}).get('name', 'Unknown')
                grades[assignment_name] = sub['score']
        
        return StudentEngagement(
            student_id=student_id,
            course_id=course_id,
            login_count=activity_data.get('page_views', 0),
            total_time_minutes=activity_data.get('time_on_task', 0) / 60,
            assignments_submitted=submitted,
            assignments_total=len(submissions),
            discussions_participated=discussion_count,
            resources_viewed=activity_data.get('resource_views', 0),
            last_activity=datetime.fromisoformat(
                activity_data.get('last_activity_at', datetime.now().isoformat())
            ),
            grades=grades
        )
    
    async def get_grades(self, student_id: str, course_id: str) -> Dict:
        """Get current grades for a student"""
        url = (
            f"{self.credentials.base_url}/api/{self.api_version}"
            f"/courses/{course_id}/users/{student_id}"
        )
        params = {"include[]": ["enrollments"]}
        
        async with self.session.get(
            url,
            headers=self._get_headers(),
            params=params
        ) as resp:
            if resp.status == 200:
                data = await resp.json()
                enrollments = data.get('enrollments', [])
                if enrollments:
                    return {
                        'current_score': enrollments[0].get('grades', {}).get('current_score'),
                        'final_score': enrollments[0].get('grades', {}).get('final_score'),
                        'current_grade': enrollments[0].get('grades', {}).get('current_grade')
                    }
        return {}
    
    async def get_attendance(
        self,
        student_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> List[Dict]:
        """Get attendance records (via Roll Call if enabled)"""
        # Canvas uses Roll Call for attendance
        # This requires the Roll Call API
        url = (
            f"{self.credentials.base_url}/api/attendance/v1"
            f"/students/{student_id}/attendance"
        )
        params = {
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat()
        }
        
        async with self.session.get(
            url,
            headers=self._get_headers(),
            params=params
        ) as resp:
            if resp.status == 200:
                return await resp.json()
        return []


class PowerSchoolConnector(LMSConnector):
    """PowerSchool SIS API connector"""
    
    def __init__(self, credentials: LMSCredentials):
        super().__init__(credentials)
        self.access_token = None
    
    async def authenticate(self) -> bool:
        """OAuth2 authentication for PowerSchool"""
        url = f"{self.credentials.base_url}/oauth/access_token"
        
        # Create client credentials
        credentials = f"{self.credentials.api_key}:{self.credentials.api_secret}"
        encoded = base64.b64encode(credentials.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {"grant_type": "client_credentials"}
        
        async with self.session.post(url, headers=headers, data=data) as resp:
            if resp.status == 200:
                token_data = await resp.json()
                self.access_token = token_data['access_token']
                self.credentials.token_expiry = datetime.now() + timedelta(
                    seconds=token_data.get('expires_in', 3600)
                )
                logger.info("PowerSchool authentication successful")
                return True
        return False
    
    def _get_headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    async def get_students(self, school_id: str = None) -> List[Dict]:
        """Get students from PowerSchool"""
        url = f"{self.credentials.base_url}/ws/v1/district/student"
        params = {"q": "student_enrollment.active=1"}
        
        if school_id:
            params["q"] += f";school_enrollment.school_id=={school_id}"
        
        async with self.session.get(
            url,
            headers=self._get_headers(),
            params=params
        ) as resp:
            if resp.status == 200:
                data = await resp.json()
                return data.get('students', {}).get('student', [])
        return []
    
    async def get_attendance(
        self,
        student_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> List[Dict]:
        """Get attendance from PowerSchool"""
        url = (
            f"{self.credentials.base_url}/ws/v1/student/{student_id}"
            f"/attendance"
        )
        params = {
            "start_date": start_date.strftime("%Y-%m-%d"),
            "end_date": end_date.strftime("%Y-%m-%d")
        }
        
        async with self.session.get(
            url,
            headers=self._get_headers(),
            params=params
        ) as resp:
            if resp.status == 200:
                data = await resp.json()
                return data.get('attendance', [])
        return []
    
    async def get_grades(self, student_id: str, course_id: str = None) -> Dict:
        """Get grades from PowerSchool"""
        url = (
            f"{self.credentials.base_url}/ws/v1/student/{student_id}"
            f"/gpa"
        )
        
        async with self.session.get(
            url,
            headers=self._get_headers()
        ) as resp:
            if resp.status == 200:
                return await resp.json()
        return {}
    
    async def get_engagement_data(
        self,
        student_id: str,
        course_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> StudentEngagement:
        """PowerSchool doesn't have native engagement - return placeholder"""
        grades = await self.get_grades(student_id)
        attendance = await self.get_attendance(student_id, start_date, end_date)
        
        present_days = sum(1 for a in attendance if a.get('status') == 'present')
        total_days = len(attendance) or 1
        
        return StudentEngagement(
            student_id=student_id,
            course_id=course_id,
            login_count=0,
            total_time_minutes=0,
            assignments_submitted=0,
            assignments_total=0,
            discussions_participated=0,
            resources_viewed=0,
            last_activity=datetime.now(),
            grades={'gpa': grades.get('gpa', {}).get('cumulative', 0)}
        )


class IntegrationOrchestrator:
    """Orchestrate data collection from multiple sources"""
    
    def __init__(self):
        self.connectors: Dict[str, LMSConnector] = {}
    
    def register_connector(self, name: str, connector: LMSConnector):
        """Register an LMS connector"""
        self.connectors[name] = connector
    
    async def collect_student_data(
        self,
        student_id: str,
        sources: List[str],
        date_range: tuple
    ) -> Dict[str, Any]:
        """Collect data from multiple sources concurrently"""
        start_date, end_date = date_range
        
        tasks = []
        for source_name in sources:
            if source_name in self.connectors:
                connector = self.connectors[source_name]
                tasks.append(
                    self._fetch_from_source(
                        connector, student_id, start_date, end_date
                    )
                )
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        combined_data = {
            'student_id': student_id,
            'collected_at': datetime.now().isoformat(),
            'sources': {}
        }
        
        for i, result in enumerate(results):
            source_name = sources[i]
            if isinstance(result, Exception):
                logger.error(f"Error from {source_name}: {result}")
                combined_data['sources'][source_name] = {'error': str(result)}
            else:
                combined_data['sources'][source_name] = result
        
        return combined_data
    
    async def _fetch_from_source(
        self,
        connector: LMSConnector,
        student_id: str,
        start_date: datetime,
        end_date: datetime
    ) -> Dict:
        """Fetch all available data from a single source"""
        async with connector:
            await connector.authenticate()
            
            engagement = await connector.get_engagement_data(
                student_id, "all", start_date, end_date
            )
            attendance = await connector.get_attendance(
                student_id, start_date, end_date
            )
            
            return {
                'engagement': {
                    'login_count': engagement.login_count,
                    'time_on_task': engagement.total_time_minutes,
                    'submissions': engagement.assignments_submitted,
                    'discussions': engagement.discussions_participated
                },
                'attendance': attendance,
                'grades': engagement.grades
            }


# Webhook handler for real-time updates
class WebhookHandler:
    """Handle incoming webhooks from LMS platforms"""
    
    def __init__(self, secret_key: str):
        self.secret_key = secret_key
        self.handlers: Dict[str, callable] = {}
    
    def verify_signature(
        self,
        payload: bytes,
        signature: str,
        platform: LMSPlatform
    ) -> bool:
        """Verify webhook signature"""
        if platform == LMSPlatform.CANVAS:
            expected = hmac.new(
                self.secret_key.encode(),
                payload,
                hashlib.sha256
            ).hexdigest()
            return hmac.compare_digest(signature, expected)
        return False
    
    def register_handler(self, event_type: str, handler: callable):
        """Register a handler for an event type"""
        self.handlers[event_type] = handler
    
    async def process_webhook(
        self,
        event_type: str,
        payload: Dict
    ) -> Dict:
        """Process an incoming webhook"""
        if event_type in self.handlers:
            return await self.handlers[event_type](payload)
        
        logger.warning(f"No handler for event type: {event_type}")
        return {"status": "ignored"}


# Example usage
async def main():
    # Canvas integration example
    canvas_creds = LMSCredentials(
        platform=LMSPlatform.CANVAS,
        base_url="https://school.instructure.com",
        api_key="your-api-token"
    )
    
    orchestrator = IntegrationOrchestrator()
    orchestrator.register_connector("canvas", CanvasConnector(canvas_creds))
    
    # Collect data
    student_data = await orchestrator.collect_student_data(
        student_id="12345",
        sources=["canvas"],
        date_range=(datetime.now() - timedelta(days=30), datetime.now())
    )
    
    logger.info(f"Collected data: {json.dumps(student_data, indent=2, default=str)}")


if __name__ == "__main__":
    asyncio.run(main())`,
  },
  realTimeAPI: {
    title: 'Real-Time Prediction API',
    description: 'FastAPI service for real-time student risk predictions and alerts',
    language: 'python',
    code: `"""
EduPredict AI - Real-Time Prediction API
FastAPI service for serving predictions and managing alerts
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, WebSocket
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from enum import Enum
import asyncio
import jwt
import redis
from contextlib import asynccontextmanager
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Redis for caching and pub/sub
redis_client = redis.Redis(host='localhost', port=6379, db=0)


# Pydantic Models
class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class StudentPredictionRequest(BaseModel):
    student_id: str
    include_factors: bool = True
    include_recommendations: bool = True


class BatchPredictionRequest(BaseModel):
    student_ids: List[str]
    include_factors: bool = False


class PredictionResponse(BaseModel):
    student_id: str
    risk_level: RiskLevel
    risk_score: float = Field(..., ge=0, le=100)
    confidence: float = Field(..., ge=0, le=1)
    contributing_factors: Optional[Dict[str, float]] = None
    recommended_interventions: Optional[List[str]] = None
    predicted_at: datetime
    model_version: str


class AlertConfig(BaseModel):
    risk_threshold: float = Field(default=70, ge=0, le=100)
    attendance_threshold: float = Field(default=80, ge=0, le=100)
    grade_drop_threshold: float = Field(default=10, ge=0, le=100)
    notify_emails: List[str] = []
    notify_webhook: Optional[str] = None


class Alert(BaseModel):
    id: str
    student_id: str
    student_name: str
    alert_type: str
    severity: str
    message: str
    created_at: datetime
    acknowledged: bool = False
    acknowledged_by: Optional[str] = None
    acknowledged_at: Optional[datetime] = None


class InterventionRecommendation(BaseModel):
    intervention_id: str
    name: str
    description: str
    effectiveness_score: float
    match_score: float
    estimated_duration: str
    required_resources: List[str]


class Token(BaseModel):
    access_token: str
    token_type: str


class User(BaseModel):
    username: str
    email: str
    role: str
    institution_id: str


# Application setup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Loading ML models...")
    # Load your trained models here
    app.state.model_version = "v2.3.1"
    app.state.connected_clients = set()
    yield
    # Shutdown
    logger.info("Shutting down...")


app = FastAPI(
    title="EduPredict AI API",
    description="Real-time student performance prediction and intervention system",
    version="2.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Authentication
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return User(
            username=username,
            email=payload.get("email"),
            role=payload.get("role"),
            institution_id=payload.get("institution_id")
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# API Endpoints
@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate and receive access token"""
    # Validate credentials (implement your auth logic)
    # This is a placeholder
    if form_data.username == "demo" and form_data.password == "demo":
        access_token = create_access_token(
            data={
                "sub": form_data.username,
                "email": "demo@school.edu",
                "role": "admin",
                "institution_id": "school_001"
            },
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/api/v1/health")
async def health_check():
    """API health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "model_version": app.state.model_version
    }


@app.post("/api/v1/predict", response_model=PredictionResponse)
async def predict_student_risk(
    request: StudentPredictionRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    """Get risk prediction for a single student"""
    
    # Check cache first
    cache_key = f"prediction:{request.student_id}"
    cached = redis_client.get(cache_key)
    
    if cached:
        return PredictionResponse(**json.loads(cached))
    
    # Fetch student data and make prediction
    # This would call your ML model
    prediction = PredictionResponse(
        student_id=request.student_id,
        risk_level=RiskLevel.HIGH,
        risk_score=72.5,
        confidence=0.89,
        contributing_factors={
            "attendance_rate": 35.2,
            "gpa_trend": 28.1,
            "engagement_score": 22.4,
            "late_submissions": 14.3
        } if request.include_factors else None,
        recommended_interventions=[
            "one_on_one_tutoring",
            "attendance_intervention",
            "counselor_meeting"
        ] if request.include_recommendations else None,
        predicted_at=datetime.utcnow(),
        model_version=app.state.model_version
    )
    
    # Cache prediction
    redis_client.setex(
        cache_key,
        timedelta(minutes=15),
        json.dumps(prediction.dict(), default=str)
    )
    
    # Log prediction for audit
    background_tasks.add_task(
        log_prediction,
        prediction,
        current_user.username
    )
    
    return prediction


@app.post("/api/v1/predict/batch", response_model=List[PredictionResponse])
async def batch_predict(
    request: BatchPredictionRequest,
    current_user: User = Depends(get_current_user)
):
    """Get predictions for multiple students"""
    
    if len(request.student_ids) > 100:
        raise HTTPException(
            status_code=400,
            detail="Maximum 100 students per batch request"
        )
    
    predictions = []
    for student_id in request.student_ids:
        # Generate prediction (would call ML model)
        pred = PredictionResponse(
            student_id=student_id,
            risk_level=RiskLevel.MEDIUM,
            risk_score=45.0,
            confidence=0.85,
            contributing_factors=None,
            recommended_interventions=None,
            predicted_at=datetime.utcnow(),
            model_version=app.state.model_version
        )
        predictions.append(pred)
    
    return predictions


@app.get("/api/v1/alerts", response_model=List[Alert])
async def get_alerts(
    severity: Optional[str] = None,
    acknowledged: Optional[bool] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user)
):
    """Get active alerts for the institution"""
    
    # Filter alerts based on parameters
    alerts = [
        Alert(
            id="alert_001",
            student_id="student_123",
            student_name="Emma Johnson",
            alert_type="attendance",
            severity="critical",
            message="Absent for 4 consecutive days",
            created_at=datetime.utcnow() - timedelta(hours=2),
            acknowledged=False
        ),
        Alert(
            id="alert_002",
            student_id="student_456",
            student_name="Michael Chen",
            alert_type="grade",
            severity="warning",
            message="GPA dropped below 2.0 threshold",
            created_at=datetime.utcnow() - timedelta(hours=5),
            acknowledged=False
        )
    ]
    
    if severity:
        alerts = [a for a in alerts if a.severity == severity]
    if acknowledged is not None:
        alerts = [a for a in alerts if a.acknowledged == acknowledged]
    
    return alerts[:limit]


@app.post("/api/v1/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(
    alert_id: str,
    current_user: User = Depends(get_current_user)
):
    """Acknowledge an alert"""
    # Update alert in database
    return {
        "alert_id": alert_id,
        "acknowledged": True,
        "acknowledged_by": current_user.username,
        "acknowledged_at": datetime.utcnow().isoformat()
    }


@app.get(
    "/api/v1/students/{student_id}/interventions",
    response_model=List[InterventionRecommendation]
)
async def get_intervention_recommendations(
    student_id: str,
    max_recommendations: int = 5,
    current_user: User = Depends(get_current_user)
):
    """Get personalized intervention recommendations for a student"""
    
    recommendations = [
        InterventionRecommendation(
            intervention_id="int_001",
            name="One-on-One Tutoring",
            description="Personalized academic support with certified tutor",
            effectiveness_score=0.78,
            match_score=0.92,
            estimated_duration="4-8 weeks",
            required_resources=["Certified tutor", "Study materials"]
        ),
        InterventionRecommendation(
            intervention_id="int_002",
            name="Peer Mentoring",
            description="Pairing with high-performing peer mentor",
            effectiveness_score=0.65,
            match_score=0.85,
            estimated_duration="Semester",
            required_resources=["Trained mentor", "Meeting space"]
        ),
        InterventionRecommendation(
            intervention_id="int_003",
            name="Attendance Intervention",
            description="Targeted support for chronic absenteeism",
            effectiveness_score=0.72,
            match_score=0.88,
            estimated_duration="6-12 weeks",
            required_resources=["Counselor", "Family liaison"]
        )
    ]
    
    return recommendations[:max_recommendations]


@app.post("/api/v1/students/{student_id}/interventions/{intervention_id}/assign")
async def assign_intervention(
    student_id: str,
    intervention_id: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    """Assign an intervention to a student"""
    
    # Create intervention assignment
    assignment = {
        "student_id": student_id,
        "intervention_id": intervention_id,
        "assigned_by": current_user.username,
        "assigned_at": datetime.utcnow().isoformat(),
        "status": "active"
    }
    
    # Notify stakeholders
    background_tasks.add_task(
        notify_intervention_assignment,
        assignment
    )
    
    return assignment


@app.get("/api/v1/analytics/summary")
async def get_analytics_summary(
    timeframe: str = "30d",
    current_user: User = Depends(get_current_user)
):
    """Get analytics summary for dashboard"""
    
    return {
        "total_students": 2847,
        "predictions_today": 1456,
        "active_alerts": 23,
        "risk_distribution": {
            "low": 1282,
            "medium": 798,
            "high": 513,
            "critical": 254
        },
        "model_accuracy": 0.942,
        "intervention_success_rate": 0.73,
        "average_response_time_ms": 45,
        "timeframe": timeframe
    }


# WebSocket for real-time updates
@app.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    """WebSocket endpoint for real-time alert notifications"""
    await websocket.accept()
    app.state.connected_clients.add(websocket)
    
    try:
        while True:
            # Listen for new alerts from Redis pub/sub
            data = await websocket.receive_text()
            # Process incoming commands if needed
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        app.state.connected_clients.discard(websocket)


# Background tasks
async def log_prediction(prediction: PredictionResponse, user: str):
    """Log prediction for audit trail"""
    log_entry = {
        "type": "prediction",
        "student_id": prediction.student_id,
        "risk_level": prediction.risk_level,
        "risk_score": prediction.risk_score,
        "user": user,
        "timestamp": datetime.utcnow().isoformat()
    }
    # Store in database/logging system
    logger.info(f"Prediction logged: {log_entry}")


async def notify_intervention_assignment(assignment: dict):
    """Send notifications for intervention assignment"""
    # Send email, push notification, etc.
    logger.info(f"Intervention assigned: {assignment}")


async def broadcast_alert(alert: Alert):
    """Broadcast alert to all connected WebSocket clients"""
    for client in app.state.connected_clients:
        try:
            await client.send_json(alert.dict())
        except Exception:
            pass


# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
  },
  privacySecurity: {
    title: 'Privacy & Security Module',
    description: 'FERPA-compliant data handling, encryption, and access control',
    language: 'python',
    code: `"""
EduPredict AI - Privacy & Security Module
FERPA/COPPA compliant data handling and security utilities
"""

import hashlib
import secrets
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
import base64
from typing import Dict, List, Optional, Set, Any
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
from functools import wraps
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Permission(Enum):
    """System permissions"""
    VIEW_STUDENT_DATA = "view_student_data"
    VIEW_PREDICTIONS = "view_predictions"
    MANAGE_INTERVENTIONS = "manage_interventions"
    VIEW_ANALYTICS = "view_analytics"
    ADMIN_SETTINGS = "admin_settings"
    EXPORT_DATA = "export_data"
    MANAGE_USERS = "manage_users"


class Role(Enum):
    """User roles with associated permissions"""
    TEACHER = "teacher"
    COUNSELOR = "counselor"
    ADMINISTRATOR = "administrator"
    DISTRICT_ADMIN = "district_admin"
    RESEARCHER = "researcher"  # De-identified data only


# Role-permission mapping
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.TEACHER: {
        Permission.VIEW_STUDENT_DATA,
        Permission.VIEW_PREDICTIONS,
        Permission.MANAGE_INTERVENTIONS,
    },
    Role.COUNSELOR: {
        Permission.VIEW_STUDENT_DATA,
        Permission.VIEW_PREDICTIONS,
        Permission.MANAGE_INTERVENTIONS,
        Permission.VIEW_ANALYTICS,
    },
    Role.ADMINISTRATOR: {
        Permission.VIEW_STUDENT_DATA,
        Permission.VIEW_PREDICTIONS,
        Permission.MANAGE_INTERVENTIONS,
        Permission.VIEW_ANALYTICS,
        Permission.ADMIN_SETTINGS,
        Permission.EXPORT_DATA,
        Permission.MANAGE_USERS,
    },
    Role.DISTRICT_ADMIN: {
        Permission.VIEW_PREDICTIONS,
        Permission.VIEW_ANALYTICS,
        Permission.ADMIN_SETTINGS,
        Permission.MANAGE_USERS,
    },
    Role.RESEARCHER: {
        Permission.VIEW_ANALYTICS,  # De-identified only
    },
}


@dataclass
class User:
    """User with role-based access control"""
    user_id: str
    email: str
    role: Role
    institution_id: str
    assigned_students: Set[str] = field(default_factory=set)
    assigned_courses: Set[str] = field(default_factory=set)
    permissions: Set[Permission] = field(default_factory=set)
    
    def __post_init__(self):
        # Assign default permissions based on role
        self.permissions = ROLE_PERMISSIONS.get(self.role, set())
    
    def has_permission(self, permission: Permission) -> bool:
        return permission in self.permissions
    
    def can_access_student(self, student_id: str) -> bool:
        """Check if user can access specific student data"""
        if self.role in [Role.ADMINISTRATOR, Role.COUNSELOR]:
            return True
        return student_id in self.assigned_students


@dataclass
class AuditLog:
    """Audit log entry for compliance"""
    log_id: str
    timestamp: datetime
    user_id: str
    action: str
    resource_type: str
    resource_id: str
    details: Dict
    ip_address: str
    success: bool


class DataEncryption:
    """Encryption utilities for sensitive data"""
    
    def __init__(self, master_key: bytes):
        self.master_key = master_key
        self._cipher = None
    
    def _get_cipher(self, salt: bytes = None) -> Fernet:
        """Generate Fernet cipher from master key"""
        if salt is None:
            salt = secrets.token_bytes(16)
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        key = base64.urlsafe_b64encode(kdf.derive(self.master_key))
        return Fernet(key), salt
    
    def encrypt(self, data: str) -> Dict[str, str]:
        """Encrypt sensitive data"""
        cipher, salt = self._get_cipher()
        encrypted = cipher.encrypt(data.encode())
        return {
            "ciphertext": base64.b64encode(encrypted).decode(),
            "salt": base64.b64encode(salt).decode()
        }
    
    def decrypt(self, encrypted_data: Dict[str, str]) -> str:
        """Decrypt sensitive data"""
        salt = base64.b64decode(encrypted_data["salt"])
        ciphertext = base64.b64decode(encrypted_data["ciphertext"])
        cipher, _ = self._get_cipher(salt)
        return cipher.decrypt(ciphertext).decode()
    
    @staticmethod
    def hash_identifier(identifier: str, salt: str = None) -> str:
        """One-way hash for de-identification"""
        if salt is None:
            salt = secrets.token_hex(16)
        
        combined = f"{identifier}:{salt}"
        hashed = hashlib.sha256(combined.encode()).hexdigest()
        return f"{hashed}:{salt}"
    
    @staticmethod
    def generate_anonymous_id() -> str:
        """Generate anonymous identifier for research data"""
        return f"anon_{secrets.token_hex(8)}"


class DataAnonymizer:
    """Anonymize student data for research and aggregate reporting"""
    
    # Fields that must be removed for de-identification
    PII_FIELDS = {
        'name', 'first_name', 'last_name', 'email', 'phone',
        'address', 'ssn', 'student_id', 'guardian_name',
        'guardian_email', 'guardian_phone', 'date_of_birth'
    }
    
    # Fields to generalize
    GENERALIZE_FIELDS = {
        'age': lambda x: f"{(x // 5) * 5}-{(x // 5) * 5 + 4}",
        'grade_level': lambda x: x,  # Keep as-is
        'zip_code': lambda x: x[:3] + "XX" if len(x) >= 3 else "XXXXX"
    }
    
    def __init__(self, encryption: DataEncryption):
        self.encryption = encryption
        self.id_mapping: Dict[str, str] = {}
    
    def anonymize_record(self, record: Dict) -> Dict:
        """Anonymize a single student record"""
        anonymized = {}
        
        for key, value in record.items():
            # Remove PII
            if key.lower() in self.PII_FIELDS:
                continue
            
            # Generalize certain fields
            if key.lower() in self.GENERALIZE_FIELDS:
                anonymized[key] = self.GENERALIZE_FIELDS[key.lower()](value)
            else:
                anonymized[key] = value
        
        # Replace student_id with anonymous ID
        if 'student_id' in record:
            original_id = record['student_id']
            if original_id not in self.id_mapping:
                self.id_mapping[original_id] = DataEncryption.generate_anonymous_id()
            anonymized['anonymous_id'] = self.id_mapping[original_id]
        
        return anonymized
    
    def anonymize_dataset(self, records: List[Dict]) -> List[Dict]:
        """Anonymize a dataset for research"""
        return [self.anonymize_record(r) for r in records]
    
    @staticmethod
    def k_anonymize(
        records: List[Dict],
        quasi_identifiers: List[str],
        k: int = 5
    ) -> List[Dict]:
        """
        Apply k-anonymity to dataset.
        Ensures each combination of quasi-identifiers appears at least k times.
        """
        from collections import defaultdict
        
        # Group by quasi-identifier combinations
        groups = defaultdict(list)
        for record in records:
            key = tuple(record.get(qi) for qi in quasi_identifiers)
            groups[key].append(record)
        
        # Suppress groups with fewer than k records
        anonymized = []
        for key, group in groups.items():
            if len(group) >= k:
                anonymized.extend(group)
            else:
                # Generalize or suppress small groups
                logger.warning(f"Suppressing {len(group)} records (k={k} not met)")
        
        return anonymized


class AccessControl:
    """Role-based access control for student data"""
    
    def __init__(self):
        self.audit_log: List[AuditLog] = []
    
    def check_access(
        self,
        user: User,
        action: str,
        resource_type: str,
        resource_id: str = None
    ) -> bool:
        """Check if user has access to perform action on resource"""
        
        # Map actions to permissions
        action_permissions = {
            'view': Permission.VIEW_STUDENT_DATA,
            'predict': Permission.VIEW_PREDICTIONS,
            'intervene': Permission.MANAGE_INTERVENTIONS,
            'analytics': Permission.VIEW_ANALYTICS,
            'export': Permission.EXPORT_DATA,
            'admin': Permission.ADMIN_SETTINGS,
        }
        
        required_permission = action_permissions.get(action)
        if not required_permission:
            return False
        
        # Check permission
        if not user.has_permission(required_permission):
            return False
        
        # For student data, check assignment
        if resource_type == 'student' and resource_id:
            if not user.can_access_student(resource_id):
                return False
        
        return True
    
    def log_access(
        self,
        user: User,
        action: str,
        resource_type: str,
        resource_id: str,
        success: bool,
        details: Dict = None,
        ip_address: str = None
    ):
        """Log access attempt for audit trail"""
        log_entry = AuditLog(
            log_id=secrets.token_hex(16),
            timestamp=datetime.utcnow(),
            user_id=user.user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            details=details or {},
            ip_address=ip_address or "unknown",
            success=success
        )
        self.audit_log.append(log_entry)
        
        # Log to persistent storage
        logger.info(
            f"ACCESS {'GRANTED' if success else 'DENIED'}: "
            f"User {user.user_id} attempted {action} on "
            f"{resource_type}/{resource_id}"
        )
    
    def require_permission(self, permission: Permission):
        """Decorator to require permission for a function"""
        def decorator(func):
            @wraps(func)
            def wrapper(user: User, *args, **kwargs):
                if not user.has_permission(permission):
                    raise PermissionError(
                        f"User lacks required permission: {permission.value}"
                    )
                return func(user, *args, **kwargs)
            return wrapper
        return decorator


class DataRetention:
    """Data retention policy management"""
    
    # Retention periods by data type (in days)
    RETENTION_POLICIES = {
        'predictions': 365,           # 1 year
        'alerts': 180,                # 6 months
        'audit_logs': 2555,           # 7 years (FERPA)
        'student_records': 2555,      # 7 years after graduation
        'engagement_data': 365,       # 1 year
        'anonymized_research': None,  # Indefinite
    }
    
    def __init__(self, db_connection):
        self.db = db_connection
    
    def apply_retention_policy(self, data_type: str) -> int:
        """Apply retention policy and delete expired data"""
        retention_days = self.RETENTION_POLICIES.get(data_type)
        
        if retention_days is None:
            return 0  # Indefinite retention
        
        cutoff_date = datetime.utcnow() - timedelta(days=retention_days)
        
        # Delete expired records
        deleted_count = self._delete_expired(data_type, cutoff_date)
        
        logger.info(
            f"Retention policy applied to {data_type}: "
            f"deleted {deleted_count} records older than {cutoff_date}"
        )
        
        return deleted_count
    
    def _delete_expired(self, data_type: str, cutoff_date: datetime) -> int:
        """Delete records older than cutoff date"""
        # Implement actual deletion logic
        # This is a placeholder
        return 0
    
    def schedule_retention_jobs(self):
        """Schedule regular retention policy enforcement"""
        # Would integrate with job scheduler
        pass


class ConsentManager:
    """Manage data consent and opt-outs"""
    
    def __init__(self):
        self.consents: Dict[str, Dict] = {}
    
    def record_consent(
        self,
        student_id: str,
        guardian_id: str,
        consent_type: str,
        granted: bool,
        effective_date: datetime = None
    ):
        """Record consent decision"""
        consent_record = {
            'student_id': student_id,
            'guardian_id': guardian_id,
            'consent_type': consent_type,
            'granted': granted,
            'effective_date': effective_date or datetime.utcnow(),
            'recorded_at': datetime.utcnow()
        }
        
        key = f"{student_id}:{consent_type}"
        self.consents[key] = consent_record
    
    def check_consent(self, student_id: str, consent_type: str) -> bool:
        """Check if consent is granted"""
        key = f"{student_id}:{consent_type}"
        consent = self.consents.get(key)
        
        if not consent:
            return False  # No consent recorded = not granted
        
        return consent['granted']
    
    def get_consent_summary(self, student_id: str) -> Dict:
        """Get all consent records for a student"""
        return {
            k: v for k, v in self.consents.items()
            if k.startswith(f"{student_id}:")
        }


# Example usage
if __name__ == "__main__":
    # Initialize encryption
    master_key = secrets.token_bytes(32)
    encryption = DataEncryption(master_key)
    
    # Encrypt sensitive data
    sensitive_data = "SSN: 123-45-6789"
    encrypted = encryption.encrypt(sensitive_data)
    print(f"Encrypted: {encrypted}")
    
    decrypted = encryption.decrypt(encrypted)
    print(f"Decrypted: {decrypted}")
    
    # Anonymize data
    anonymizer = DataAnonymizer(encryption)
    student_record = {
        'student_id': 'STU001',
        'name': 'John Smith',
        'email': 'john@school.edu',
        'gpa': 3.2,
        'attendance_rate': 92,
        'risk_score': 45
    }
    
    anonymized = anonymizer.anonymize_record(student_record)
    print(f"Anonymized: {anonymized}")
    
    # Access control
    access_control = AccessControl()
    teacher = User(
        user_id="T001",
        email="teacher@school.edu",
        role=Role.TEACHER,
        institution_id="school_001",
        assigned_students={"STU001", "STU002"}
    )
    
    # Check access
    can_view = access_control.check_access(
        teacher, 'view', 'student', 'STU001'
    )
    print(f"Teacher can view STU001: {can_view}")
    
    can_export = access_control.check_access(
        teacher, 'export', 'report', None
    )
    print(f"Teacher can export: {can_export}")`,
  },
}

const categories = [
  { id: 'dataProcessing', label: 'Data Processing', icon: Database },
  { id: 'predictiveModel', label: 'ML Model', icon: Brain },
  { id: 'apiIntegration', label: 'LMS Integration', icon: Plug },
  { id: 'realTimeAPI', label: 'Real-Time API', icon: Zap },
  { id: 'privacySecurity', label: 'Privacy & Security', icon: Shield },
]

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-8 w-8 p-0"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <ScrollArea className="h-[600px] rounded-lg border border-border bg-secondary/50">
        <pre className="p-4">
          <code className="text-xs font-mono text-foreground leading-relaxed whitespace-pre">
            {code}
          </code>
        </pre>
      </ScrollArea>
    </div>
  )
}

export default function DeveloperPage() {
  const [activeCategory, setActiveCategory] = useState('dataProcessing')

  const activeExample = codeExamples[activeCategory as keyof typeof codeExamples]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Developer Documentation</h1>
                  <p className="text-muted-foreground">
                    Python code examples for data processing, ML modeling, and system integration
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
              <Card className="border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                    <FileCode className="h-5 w-5 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">API Reference</p>
                    <p className="text-xs text-muted-foreground">REST endpoints</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                    <GitBranch className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">SDK Libraries</p>
                    <p className="text-xs text-muted-foreground">Python, Node.js</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                    <Server className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Webhooks</p>
                    <p className="text-xs text-muted-foreground">Real-time events</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                    <Lock className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Authentication</p>
                    <p className="text-xs text-muted-foreground">OAuth2 / JWT</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Architecture Overview */}
            <Card className="mb-8 border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  System Architecture Overview
                </CardTitle>
                <CardDescription>
                  Modular architecture designed for scalability and integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-chart-1" />
                      <h3 className="font-semibold text-foreground">Data Layer</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                        Multi-source ETL pipelines
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                        Real-time data streaming
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                        Data validation & cleaning
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-1" />
                        Feature engineering
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="h-5 w-5 text-chart-2" />
                      <h3 className="font-semibold text-foreground">ML Engine</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                        Ensemble prediction models
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                        Risk scoring algorithms
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                        Intervention matching
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                        Model versioning & A/B testing
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-chart-3" />
                      <h3 className="font-semibold text-foreground">API Layer</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                        RESTful API endpoints
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                        WebSocket real-time updates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                        OAuth2 authentication
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                        Rate limiting & caching
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Python Code Examples</CardTitle>
                <CardDescription>
                  Production-ready code snippets for implementing the student performance prediction system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="mb-6 flex h-auto flex-wrap gap-2 bg-transparent p-0">
                    {categories.map((cat) => (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      >
                        <cat.icon className="h-4 w-4" />
                        {cat.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(codeExamples).map(([key, example]) => (
                    <TabsContent key={key} value={key} className="mt-0">
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {example.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {example.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="font-mono">
                            {example.language}
                          </Badge>
                        </div>
                      </div>
                      <CodeBlock code={example.code} language={example.language} />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Key Features Grid */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Database className="h-4 w-4 text-chart-1" />
                    Multi-Source Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect to Canvas, Blackboard, PowerSchool, and other LMS/SIS platforms through standardized API connectors with real-time data synchronization.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-4 w-4 text-chart-2" />
                    Ensemble ML Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    XGBoost, Random Forest, and Neural Network ensemble with 94%+ accuracy. Automated feature engineering and model retraining pipelines.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="h-4 w-4 text-chart-3" />
                    FERPA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built-in data anonymization, k-anonymity support, role-based access control, and comprehensive audit logging for regulatory compliance.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="h-4 w-4 text-chart-4" />
                    Real-Time Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sub-50ms prediction latency with Redis caching, WebSocket-based alert notifications, and batch processing for large datasets.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plug className="h-4 w-4 text-chart-5" />
                    Webhook Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to real-time events for risk level changes, new alerts, intervention assignments, and data sync completions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Server className="h-4 w-4 text-primary" />
                    Scalable Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Kubernetes-ready deployment with horizontal scaling. Handle 10,000+ concurrent predictions with distributed model serving.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
