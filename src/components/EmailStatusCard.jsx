import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import SyncIcon from "@mui/icons-material/Sync";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import '../index.css'

export default function EmailStatusCard({ item }) {
    const statusConfig = {
        PENDENTE: {
            icon: HourglassTopIcon,
            color: "#f59e0b",
            borderStyle: "dotted"
        },
        PROCESSANDO: {
            icon: SyncIcon,
            color: "#3b82f6",
            borderStyle: "dashed"
        },
        ENVIADO: {
            icon: MarkEmailReadIcon,
            color: "#22c55e",
            borderStyle: "solid"
        },
        ERRO: {
            icon: ErrorOutlinedIcon,
            color: "#ef4444",
            borderStyle: "solid"
        }
    };
    const status = item.status;
    const StatusIcon = statusConfig[status]?.icon;


    return (
        <Card sx={{ m: 2 }}>
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Box sx={{ width: 250 }}>
                    <Typography>{item.emailDoRemetente}</Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        borderTop: `3px ${statusConfig[status]?.borderStyle} ${statusConfig[status]?.color}`,
                        opacity: status === "ERRO" ? 0.25 : 0.75,
                    }}
                />

                {StatusIcon && (
                    <StatusIcon
                        sx={{
                            color: statusConfig[status]?.color,
                            animation:
                                status === "PROCESSANDO"
                                    ? "spin 4s linear infinite"
                                    : "none",
                        }}
                    />
                )}

                <Box
                    sx={{
                        flex: 1,
                        borderTop: `3px ${statusConfig[status]?.borderStyle} ${statusConfig[status]?.color}`,
                        opacity: status === "ERRO" ? 0.25 : 0.75,
                    }}
                />

                <Box sx={{ width: 250, textAlign: "right" }}>
                    <Typography>{item.destinatarios}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}