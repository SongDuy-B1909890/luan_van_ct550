import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const SkeletonChildrenDemo = () => {

    return (
        <div>
            <div className="w-[960px]">

                <Skeleton variant="rectangular" width="960px">
                    <div style={{ paddingTop: '600px' }} />
                </Skeleton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ margin: 1 }}>
                        <Skeleton variant="circular">
                            <Avatar />
                        </Skeleton>
                    </Box>
                    <Box>
                        <Skeleton width="880px">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default SkeletonChildrenDemo;