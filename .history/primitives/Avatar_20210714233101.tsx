import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';

const StyledAvatar = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 48,
  height: 48,
  borderRadius: 24,
  appearance: 'none',
  border: 'none',
  padding: 0,
});

const StyledImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'dodgerblue',
});

const StyledTooltipTrigger = styled(Tooltip.Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
});

const StyledTooltipContent = styled(Tooltip.Content, {
  borderRadius: 3,
  padding: '5px 10px',
  fontSize: 14,
  backgroundColor: 'gainsboro',
  color: 'black',
});

const ProfileAvatar = () => {

    return (
        <Tooltip.Root>
            <StyledTooltipTrigger>
                <StyledAvatar onClick={() => alert('Clicked!')}>
                    <StyledImage src="https://picsum.photos/id/1006/400/400" />
                    <StyledFallback>AB</StyledFallback>
                </StyledAvatar>
            </StyledTooltipTrigger>

            <StyledTooltipContent side="top">
            Tooltip content
            <Tooltip.Arrow style={{ fill: 'gainsboro' }} />
            </StyledTooltipContent>
        </Tooltip.Root>
    ); 
)

export default ProfileAvatar