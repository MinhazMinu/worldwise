import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../contexts/FakeAuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Call login() from context
    if (email && password) {
      login(email, password);
    }
  }

  useEffect(() => {
    // Programatically navigate to `/app` if isAuthenticated === true
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <div>
          <Button>Login</Button>
        </div>
      </form>
    </main>
  );
}
