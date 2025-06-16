function HomePage({ user, requireAuth }) {
  return (
    <div>
      <h2>Welcome to My Gym</h2>
      {/* ... מידע על סוגי תורים, שעות, צוות וכו' */}

      <button onClick={() => {
        if (!user) {
          requireAuth();
        } else {
          // לנווט לעמוד קביעת תור, לדוגמה:
          // navigate('/schedule');
        }
      }}>
        קבע תור
      </button>

      <button onClick={() => {
        if (!user) {
          requireAuth();
        } else {
          // לנווט לעמוד הפרופיל:
          // navigate('/profile');
        }
      }}>
        נהל פרופיל
      </button>
    </div>
  );
}
