/* While this template provides a good starting point for using Wear Compose, you can always
 * take a look at https://github.com/android/wear-os-samples/tree/main/ComposeStarter and
 * https://github.com/android/wear-os-samples/tree/main/ComposeAdvanced to find the most up to date
 * changes to the libraries and their usages.
 */

package com.example.labarbada.presentation

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.labarbada.R
import com.example.labarbada.presentation.theme.LaBarbadaTheme
import kotlinx.coroutines.delay
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class MainActivity : ComponentActivity() {
    var URL_BASE = "https://api-barbada.vercel.app/api/"
    var CHANNEL_ID = "new_order_channel"
    var NOTIFICATION_ID = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        createNotificationChannel()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        setContent {
            LaBarbadaTheme {
                var selectedPedido by remember { mutableStateOf<ListModel?>(null) }
                val listaPedidos = remember { mutableStateListOf<ListModel>() }
                val previousSize = remember { mutableStateOf(0) }

                if(selectedPedido == null){
                    PedidoList(listaPedidos = listaPedidos) { pedido ->
                        selectedPedido = pedido
                    }
                } else {
                    PedidosDetail(pedido = selectedPedido!!){
                        selectedPedido = null
                    }
                }
                //PedidoList(listaPedidos)
                LaunchedEffect(Unit) {
                    val retrofit = Retrofit.Builder()
                        .baseUrl(URL_BASE)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build()

                    val service = retrofit.create(ListApiService::class.java)

                    while (true){
                        try {
                            val response = service.getList()
                            listaPedidos.clear()
                            listaPedidos.addAll(response)
                            response.forEach { pedido ->
                                Log.d("API_RESPONSE", pedido.toString())
                            }
                            if (listaPedidos.size > previousSize.value) {
                                sendNotification(listaPedidos.last())
                                previousSize.value = listaPedidos.size
                            }
                        } catch (e: Exception) {
                            // Manejar cualquier error aquí
                            e.printStackTrace()
                        }
                        delay(10000)
                    }
                }
            }
        }
    }

    var requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ){isGranted: Boolean ->
        if (!isGranted){

        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "New Order Channel"
            val descriptionText = "Channel for new order notifications"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }
            val notificationManager: NotificationManager =
                getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun sendNotification(pedido: ListModel) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            val builder = NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.splash_icon) // Reemplaza con tu ícono de notificación
                .setContentTitle("Nuevo Pedido")
                .setContentText("Pedido de ${pedido.nombre_usuario}")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)

            with(NotificationManagerCompat.from(this)) {
                notify(NOTIFICATION_ID, builder.build())
            }
        } else {
            println("Permiso de notificaciones no concedido")
        }
    }
}

@Composable
fun PedidoList(listaPedidos: List<ListModel>, onPedidoClick: (ListModel) -> Unit) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(listaPedidos) { pedido ->
            Button(onClick = { onPedidoClick(pedido)}, shape = RoundedCornerShape(4.dp), modifier = Modifier .fillMaxSize()) {
                Text(text = "Pedido No: ${pedido.id_venta}", style = MaterialTheme.typography.bodySmall, color = Color.Black )
            }
        }
    }
}

@Composable
fun PedidosDetail(pedido: ListModel, onBack: () -> Unit){
    Column (
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ){
        Text(text = "Pedido para: ${pedido.nombre_usuario}", style = MaterialTheme.typography.bodySmall, color = Color.Black)
        Text(text = "${pedido.descripcion_direccion}", style = MaterialTheme.typography.bodySmall, color = Color.Black)
        Button(onClick = { onBack() }, modifier = Modifier .fillMaxSize()) {
            Text(text = "volver")
        }
    }
}