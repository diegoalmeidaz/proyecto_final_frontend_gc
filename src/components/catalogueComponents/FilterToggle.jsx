export default function FilterToggle({ visible, active, onClear, onApply }) {
    if (active) {
      return (
        <button onClick={onClear} className="btn ph3 pv1 br3 f6 ba b--moon-gray">
          Borrar Filtro
        </button>
      );
    }
  
    if (visible) {
      return (
        <button onClick={onApply} className="btn ph3 pv1 br3 f6 ba b--moon-gray">
          Aplicar Filtro
        </button>
      );
    }
  
    return null;
  }
  