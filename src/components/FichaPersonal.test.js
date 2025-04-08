import { render, screen, fireEvent } from '@testing-library/react';
import FichaPersonal from './fichaPersonal'; 

describe('FichaPersonal Component', () => {
  it('debe renderizar el formulario correctamente', () => {
    render(<FichaPersonal />);

    expect(screen.getByText('Ficha Personal')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono:/i)).toBeInTheDocument();
    expect(screen.getByText('Guardar Datos')).toBeInTheDocument();
  });

  it('debe actualizar los valores del formulario cuando se escriben', () => {
    render(<FichaPersonal />);

    const nombreInput = screen.getByLabelText(/Nombre:/i);
    const apellidoInput = screen.getByLabelText(/Apellido:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const telefonoInput = screen.getByLabelText(/Teléfono:/i);

    fireEvent.change(nombreInput, { target: { value: 'Javier' } });
    fireEvent.change(apellidoInput, { target: { value: 'Pantoja' } });
    fireEvent.change(emailInput, { target: { value: 'lunaMideros@example.com' } });
    fireEvent.change(telefonoInput, { target: { value: '123456789' } });

    expect(nombreInput.value).toBe('Javier');
    expect(apellidoInput.value).toBe('Pantoja');
    expect(emailInput.value).toBe('lunaMideros@example.com');
    expect(telefonoInput.value).toBe('123456789');
  });

  it('debe llamar a onAccion con los datos del formulario al enviar', () => {
    const mockOnAccion = jest.fn();
    render(<FichaPersonal onAccion={mockOnAccion} />);

    const nombreInput = screen.getByLabelText(/Nombre:/i);
    const apellidoInput = screen.getByLabelText(/Apellido:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const telefonoInput = screen.getByLabelText(/Teléfono:/i);
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nombreInput, { target: { value: 'Javier' } });
    fireEvent.change(apellidoInput, { target: { value: 'Pantoja' } });
    fireEvent.change(emailInput, { target: { value: 'lunaMideros@example.com' } });
    fireEvent.change(telefonoInput, { target: { value: '123456789' } });
    
    fireEvent.click(submitButton);

    expect(mockOnAccion).toHaveBeenCalledWith({
      nombre: 'Javier',
      apellido: 'Pantoja',
      email: 'lunaMideros@example.com',
      telefono: '123456789'
    });
  });

  it('debe funcionar sin la prop onAccion', () => {
    render(<FichaPersonal />);
    
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.click(submitButton);
  });
});