import { expect as jestExpect } from 'vitest'
import '@testing-library/jest-dom/extend-expect'

// Extend the expect object with jest-dom matchers
export const expect = jestExpect
