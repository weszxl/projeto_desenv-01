import { useState } from 'react';
import LoginModal from '../components/LoginModal';

const LoginPage = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LoginPage;
