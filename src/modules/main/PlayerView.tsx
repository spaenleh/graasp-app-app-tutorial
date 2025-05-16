import { ChangeEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Close } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { hooks, mutations } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

const PlayerView = (): JSX.Element => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');
  const { data: answerData } = hooks.useAppData<{ value: string }>({
    type: 'answer',
  });
  const postAppData = mutations.usePostAppData();
  const deleteAppData = mutations.useDeleteAppData();
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const newValue = event.target.value;
    setAnswer(newValue);
    // eslint-disable-next-line no-console
    console.log(newValue);
  };

  useEffect(() => {
    if (answerData) {
      setAnswer(answerData[answerData.length - 1].data.value);
    }
  }, [answerData]);

  const handleSubmit = (): void => {
    postAppData.mutate({ type: 'answer', data: { value: answer } });
  };

  return (
    <div data-cy={PLAYER_VIEW_CY} style={{ paddingBottom: '100px' }}>
      <Stack direction="row">
        <Typography>{t('Hello')}</Typography>
        <TextField value={answer} onChange={handleChange} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
      {answerData?.map(({ id, data }) => (
        <Stack key={id} direction="row">
          <Typography>{data.value}</Typography>
          <IconButton
            onClick={() => {
              deleteAppData.mutate({ id });
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      ))}
    </div>
  );
};
export default PlayerView;
