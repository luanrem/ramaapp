import { Container } from '../../styles/components/Divisor'

import Divider from '@material-ui/core/Divider'

interface DivisorDTO {
  orientation: 'vertical' | 'horizontal'
  variant: 'inset' | 'middle' | 'fullWidth'
  percent?: number
  padding?: number
}

export default function Divisor({
  orientation,
  variant,
  percent,
  padding,
  ...rest
}: DivisorDTO) {
  return (
    <Container percent={percent} padding={padding}>
      <Divider orientation={orientation} variant={variant} {...rest} />
    </Container>
  )
}
