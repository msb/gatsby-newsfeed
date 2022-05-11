import React, { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

type AppTheme = {
  spacing: number
}

// The application theme (current only specifies the spacing)
const theme: AppTheme = {
  spacing: 6,
}

type ThemedPropsBase = {
  theme: AppTheme
}

const Theme = ({ children }: { children: ReactNode }): ReactElement => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

// Helper function to give a theme's spacing
const spacing = (props: ThemedPropsBase): number => props.theme.spacing

export type { AppTheme, ThemedPropsBase }
export { spacing }
export default Theme
