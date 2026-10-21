import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantityControls } from './QuantityControls';
import type { Item } from '../api/items';
const item: Item = { id:'i', name:'сыр', count:0.5, unit:'kg', list_id:'u', bought:false };
describe('quick quantity editing', () => {
  it('keeps rejected exact input and does not overwrite a newer row', async () => {
    const edit = vi.fn().mockResolvedValue(false), close = vi.fn();
    const props = { onIncrement:vi.fn(),onDecrement:vi.fn(),onEdit:edit,onClose:close };
    const {rerender} = render(<QuantityControls item={item} {...props} />);
    fireEvent.change(screen.getByRole('textbox'), {target:{value:'0,25'}});
    rerender(<QuantityControls item={{...item,count:2}} {...props} />);
    fireEvent.click(screen.getByText('Сохранить'));
    await waitFor(() => expect(edit).toHaveBeenCalledWith('i',{count:0.25},item));
    expect(screen.getByRole('textbox')).toHaveProperty('value','0,25');
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(close).not.toHaveBeenCalled();
  });
  it('applies steps immediately and labels the zero step as removal', () => {
    const less = vi.fn(), more = vi.fn();
    render(<QuantityControls item={{...item,count:0.1}} onIncrement={more} onDecrement={less} onEdit={vi.fn()} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button',{name:'Удалить: сыр'}));
    fireEvent.click(screen.getByRole('button',{name:/Увеличить/}));
    expect(less).toHaveBeenCalledWith('i'); expect(more).toHaveBeenCalledWith('i');
  });
});
