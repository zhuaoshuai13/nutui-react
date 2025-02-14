// import * as renderer from 'react-test-renderer'
import * as React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import TrendArrow from '@/packages/trendarrow'

test('should render value when used', async () => {
  const { container } = render(<TrendArrow value={12.325} />)
  expect(container.querySelector('.nut-trendarrow__value')?.innerHTML).toBe(
    '12.33%'
  )
})

test('should render digits when used', async () => {
  const { container } = render(<TrendArrow value={12.325} digits={1} />)
  expect(container.querySelector('.nut-trendarrow__value')?.innerHTML).toBe(
    '12.3%'
  )
})

test('should render symbol when used', async () => {
  const { container } = render(<TrendArrow value={12.325} symbol />)
  expect(container.querySelector('.nut-trendarrow__value')?.innerHTML).toBe(
    '+12.33%'
  )
})

test('should render zero when used ', async () => {
  const { container } = render(<TrendArrow value={0} symbol zero />)
  expect(container.querySelector('.nut-trendarrow__value')?.innerHTML).toBe(
    '0.00%'
  )
})

test('should not render 0  when zero is false', async () => {
  const { container } = render(<TrendArrow value={0} symbol zero={false} />)
  expect(container.querySelector('.nut-trendarrow__value')?.innerHTML).toBe(
    '--'
  )
})

test('should render left icon when arrowLeft', async () => {
  const { container } = render(<TrendArrow value={12.325} arrowLeft />)
  expect(
    container.querySelectorAll('.nut-trendarrow__icon-before')?.length
  ).toBe(0)
  expect(
    container.querySelectorAll('.nut-trendarrow__icon-after')?.length
  ).toBe(1)
})

test('should render sync text color when syncColor is true', async () => {
  const { container } = render(<TrendArrow value={12.325} syncColor />)
  expect(container.querySelector('.nut-trendarrow__value')).toHaveAttribute(
    'style',
    'color: rgb(250, 44, 25);'
  )
})

test('should render sync text color when color is true', async () => {
  const { container } = render(
    <TrendArrow value={12.325} syncColor={false} color="rgb(39,197,48)" />
  )
  expect(container.querySelector('.nut-trendarrow__value')).toHaveAttribute(
    'style',
    'color: rgb(39, 197, 48);'
  )
})

test('should render sync text color when riseColor is true', async () => {
  const { container } = render(
    <TrendArrow value={12.325} riseColor="rgb(73,143,242)" />
  )
  expect(container.querySelector('.nut-trendarrow__value')).toHaveAttribute(
    'style',
    'color: rgb(73, 143, 242);'
  )
})

test('should render sync text color when dropColor is true', async () => {
  const { container } = render(
    <TrendArrow value={-10} dropColor="rgb(73,143,242)" symbol />
  )
  expect(container.querySelector('.nut-trendarrow__value')).toHaveAttribute(
    'style',
    'color: rgb(73, 143, 242);'
  )
})
