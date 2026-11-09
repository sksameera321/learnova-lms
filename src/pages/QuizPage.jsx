import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Check, 
  BookOpen, 
  Sparkles,
  Printer
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';
import { CertificateModal } from '../components/common/CertificateModal';

export function QuizPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { recordQuizScore, getQuizScore } = useLearning();
  const { addToast } = useToast();

  const course = COURSES.find(c => c.id === courseId);
  const quiz = course?.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!course || !quiz) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Quiz Not Found</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;
    return { correctCount, percentage, passed };
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < totalQuestions) {
      addToast(`Please answer all questions before submitting (${answeredCount}/${totalQuestions} answered).`, 'warning');
      return;
    }

    const { percentage, passed } = calculateScore();
    setSubmitted(true);
    recordQuizScore(course.id, percentage, passed);

    if (passed) {
      addToast(`Exam Passed with ${percentage}%! Credential unlocked! (+150 XP)`, 'success');
    } else {
      addToast(`Exam score: ${percentage}%. Review the explanations and retry.`, 'warning');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const result = submitted ? calculateScore() : null;

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '3.5rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to={`/courses/${course.id}`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem' }}>
            <ChevronLeft size={16} /> Back to {course.title}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-brand">CERTIFICATION ASSESSMENT</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Passing Grade: {quiz.passingScore}%</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem' }}>
            {quiz.title}
          </h1>
        </div>

        {!submitted ? (
          /* ACTIVE EXAM INTERACTION */
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            
            {/* Progress Bar & Question Tracker */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {Object.keys(selectedAnswers).length} of {totalQuestions} answered
                </span>
              </div>
              <div className="progress-bar-bg" style={{ height: '8px' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '1.75rem', color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem' }}>
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-secondary)',
                      border: isSelected ? '1px solid var(--accent-indigo)' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.925rem',
                      lineHeight: 1.5,
                      boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                      transition: 'all var(--trans-fast)'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '2px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="btn btn-secondary"
                style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1, cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="btn btn-primary btn-lg"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <Check size={18} /> Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="btn btn-primary"
                >
                  Next Question <ChevronRight size={16} />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* QUIZ COMPLETION SUMMARY & PEDAGOGICAL BREAKDOWN */
          <div className="animate-fade-in">
            
            {/* Score Banner Card */}
            <div className="card" style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              marginBottom: '2.5rem',
              borderColor: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: result.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                border: `2px solid ${result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'
              }}>
                {result.passed ? <Award size={36} /> : <XCircle size={36} />}
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {result.passed ? 'Mastery Verified!' : 'Needs Revision'}
              </h2>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                fontWeight: 800,
                color: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                marginBottom: '0.75rem'
              }}>
                {result.percentage}%
              </div>

              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.75rem', fontSize: '0.95rem' }}>
                {result.passed
                  ? `Outstanding achievement! You scored ${result.correctCount} of ${totalQuestions} correct questions, surpassing the ${quiz.passingScore}% requirement.`
                  : `You answered ${result.correctCount} of ${totalQuestions} questions correctly. You need at least ${quiz.passingScore}% to earn your verified credential.`
                }
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {result.passed && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="btn btn-primary btn-lg"
                    style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}
                  >
                    <Award size={18} /> View Official Diploma
                  </button>
                )}
                <button onClick={handleRetake} className="btn btn-secondary btn-lg">
                  <RotateCcw size={16} /> Retake Quiz
                </button>
                <Link to="/dashboard" className="btn btn-outline btn-lg">
                  Return to Dashboard
                </Link>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Pedagogical Answer Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {questions.map((q, idx) => {
                  const studentAnswer = selectedAnswers[idx];
                  const isCorrect = studentAnswer === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="card"
                      style={{
                        padding: '1.5rem',
                        borderLeft: `4px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                        {isCorrect ? (
                          <span className="badge badge-beginner" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={13} /> Correct
                          </span>
                        ) : (
                          <span className="badge badge-advanced" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <XCircle size={13} /> Incorrect
                          </span>
                        )}
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Question {idx + 1}</span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        {q.question}
                      </h4>

                      <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Your Answer: </span>
                        <strong style={{ color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                          {q.options[studentAnswer]}
                        </strong>
                      </div>

                      {!isCorrect && (
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Correct Answer: </span>
                          <strong style={{ color: 'var(--accent-emerald)' }}>
                            {q.options[q.correctAnswer]}
                          </strong>
                        </div>
                      )}

                      <div style={{
                        marginTop: '0.75rem',
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.825rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: 'var(--accent-cyan)' }}>Pedagogical Note: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
}
