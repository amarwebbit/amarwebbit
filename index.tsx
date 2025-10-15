import React, { useState, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';

// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '12px',
        backgroundColor: '#242424',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: '#ffffff',
    },
    subHeader: {
        fontSize: '1.1rem',
        color: '#a0a0a0',
        marginBottom: '3rem',
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, background 0.3s ease',
    },
    cardHover: {
        transform: 'translateY(-10px)',
        background: 'rgba(255, 255, 255, 0.1)',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
        color: '#00c7b3',
    },
    cardText: {
        color: '#c0c0c0',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
        textAlign: 'left',
        marginBottom: '2rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        color: '#a0a0a0',
    },
    input: {
        padding: '0.75rem',
        backgroundColor: '#1a1a1a',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#f0f0f0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '0.8rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        color: '#ffffff',
        backgroundColor: '#00c7b3',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        margin: '0.5rem',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        border: '1px solid #555',
        color: '#a0a0a0'
    },
    resultContainer: {
        padding: '3rem',
    },
    resultText: {
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: '1rem',
    },
    resultDetails: {
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '1.5rem',
        borderRadius: '8px',
        display: 'inline-block',
        textAlign: 'left',
    },
    detailItem: {
        fontSize: '1.1rem',
        color: '#c0c0c0',
        marginBottom: '0.5rem',
    }
};

type View = 'dashboard' | 'credit-card' | 'upi' | 'result';
type Prediction = {
    result: 'Fraudulent' | 'Not Fraudulent' | '';
    data: any;
};

// --- COMPONENTS ---

const Dashboard = ({ onSelect }: { onSelect: (view: View) => void }) => {
    const [hover, setHover] = useState<string | null>(null);
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Fraud Detection System</h1>
            <p style={styles.subHeader}>Select a transaction type to analyze</p>
            <div style={styles.dashboardGrid}>
                <div
                    style={{...styles.card, ...(hover === 'cc' ? styles.cardHover : {})}}
                    onClick={() => onSelect('credit-card')}
                    onMouseEnter={() => setHover('cc')}
                    onMouseLeave={() => setHover(null)}
                    role="button"
                    tabIndex={0}
                    aria-label="Analyze Credit Card Transaction"
                >
                    <h2 style={styles.cardTitle}>Credit Card</h2>
                    <p style={styles.cardText}>Enter transaction details to predict fraudulent activity.</p>
                </div>
                <div
                    style={{...styles.card, ...(hover === 'upi' ? styles.cardHover : {})}}
                    onClick={() => onSelect('upi')}
                    onMouseEnter={() => setHover('upi')}
                    onMouseLeave={() => setHover(null)}
                    role="button"
                    tabIndex={0}
                    aria-label="Analyze UPI Transaction"
                >
                    <h2 style={styles.cardTitle}>UPI</h2>
                    <p style={styles.cardText}>UPI fraud detection service. Coming soon!</p>
                </div>
            </div>
        </div>
    );
};

const CreditCardForm = ({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) => {
    const initialFormState = {
        accountNumber: '',
        time: '',
        amount: '',
        ...Array.from({ length: 28 }, (_, i) => `V${i + 1}`).reduce((acc, v) => ({ ...acc, [v]: '' }), {})
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Analyze Credit Card Transaction</h1>
            <p style={styles.subHeader}>Enter the transaction features below.</p>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="accountNumber">Account No.</label>
                        <input style={styles.input} type="text" name="accountNumber" id="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="time">Time</label>
                        <input style={styles.input} type="number" name="time" id="time" value={formData.time} onChange={handleChange} required />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="amount">Amount</label>
                        <input style={styles.input} type="number" name="amount" id="amount" step="0.01" value={formData.amount} onChange={handleChange} required />
                    </div>
                    {Object.keys(formData).filter(k => k.startsWith('V')).map(key => (
                        <div style={styles.formGroup} key={key}>
                            <label style={styles.label} htmlFor={key}>{key}</label>
                            <input style={styles.input} type="number" name={key} id={key} step="any" value={formData[key]} onChange={handleChange} required />
                        </div>
                    ))}
                </div>
                <div>
                    <button type="button" style={{ ...styles.button, ...styles.buttonSecondary }} onClick={onBack}>Back to Dashboard</button>
                    <button type="submit" style={styles.button}>Predict Fraud</button>
                </div>
            </form>
        </div>
    );
};

const UpiComingSoon = ({ onBack }: { onBack: () => void }) => (
    <div style={{ ...styles.container, ...styles.resultContainer }}>
        <h1 style={{ ...styles.header, color: '#00c7b3' }}>UPI Detection</h1>
        <p style={{ ...styles.subHeader, fontSize: '1.5rem', marginBottom: '2rem' }}>Coming Soon!</p>
        <p style={{ ...styles.cardText, marginBottom: '2rem' }}>We are working hard to bring you UPI fraud detection. Stay tuned!</p>
        <button style={styles.button} onClick={onBack}>Back to Dashboard</button>
    </div>
);

const ResultPage = ({ prediction, onBack }: { prediction: Prediction; onBack: () => void }) => {
    const isFraud = prediction.result === 'Fraudulent';
    const resultColor = isFraud ? '#ff4d4d' : '#33cc99';

    return (
        <div style={{ ...styles.container, ...styles.resultContainer }}>
            <h1 style={styles.header}>Prediction Result</h1>
            <p style={{...styles.resultText, color: resultColor}}>{prediction.result}</p>
            <div style={styles.resultDetails}>
                <p style={styles.detailItem}><strong>Account No:</strong> {prediction.data.accountNumber}</p>
                <p style={styles.detailItem}><strong>Transaction Amount:</strong> ${parseFloat(prediction.data.amount).toFixed(2)}</p>
                <p style={styles.detailItem}><strong>Transaction Time:</strong> {prediction.data.time}s</p>
            </div>
            <div style={{marginTop: '2rem'}}>
                <button style={styles.button} onClick={onBack}>Check Another Transaction</button>
            </div>
        </div>
    );
};

const App = () => {
    const [view, setView] = useState<View>('dashboard');
    const [prediction, setPrediction] = useState<Prediction>({ result: '', data: {} });

    const handleFormSubmit = (data: any) => {
        // Simulate API call and prediction
        const randomResult: Prediction['result'] = Math.random() > 0.8 ? 'Fraudulent' : 'Not Fraudulent'; // 20% chance of fraud
        setPrediction({ result: randomResult, data });
        setView('result');
    };
    
    const goBackToDashboard = () => setView('dashboard');

    const renderView = () => {
        switch (view) {
            case 'credit-card':
                return <CreditCardForm onSubmit={handleFormSubmit} onBack={goBackToDashboard} />;
            case 'upi':
                return <UpiComingSoon onBack={goBackToDashboard} />;
            case 'result':
                return <ResultPage prediction={prediction} onBack={goBackToDashboard} />;
            case 'dashboard':
            default:
                return <Dashboard onSelect={setView} />;
        }
    };

    return <main>{renderView()}</main>;
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
