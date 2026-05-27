from fastapi import APIRouter
from typing import Any
import pymysql
from backend.utils.db_conection import get_connection
conn = get_connection()

router = APIRouter()


@router.get("/bubbleteasfromaiven")
def get_bubble_teas() -> dict[str, Any]:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM bubbletea")
        rows = cur.fetchall()
    return {"ok": True, "result": rows}

@router.post("/bubbleteasfromaiven")
def create_bubble_tea(bubble_tea: dict) -> dict[str, Any]:
    with conn.cursor() as cur:
        sql = """
            INSERT INTO bubbletea (bubbletea_id, nombre, tipo_bubbletea, descripcion, precio, stock)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cur.execute(sql, (
            bubble_tea["bubbletea_id"],
            bubble_tea["nombre"],
            bubble_tea["tipo_bubbletea"],
            bubble_tea["descripcion"],
            bubble_tea["precio"],
            bubble_tea["stock"]
        ))
    conn.commit()
    return {"ok": True, "result": bubble_tea}

@router.put("/bubbleteasfromaiven/{bubbletea_id}")
def update_bubble_tea(bubbletea_id: int, bubble_tea: dict) -> dict[str, Any]:
    with conn.cursor() as cur:
        sql = """
            UPDATE bubbletea
            SET nombre = %s, tipo_bubbletea = %s, descripcion = %s, precio = %s, stock = %s
            WHERE bubbletea_id = %s
        """
        cur.execute(sql, (
            bubble_tea["nombre"],
            bubble_tea["tipo_bubbletea"],
            bubble_tea["descripcion"],
            bubble_tea["precio"],
            bubble_tea["stock"],
            bubbletea_id
        ))
        if cur.rowcount == 0:
            return {"ok": False, "result": f"Bubble tea {bubbletea_id} no encontrado"}
    conn.commit()
    return {"ok": True, "result": bubble_tea}

@router.delete("/bubbleteasfromaiven/{bubbletea_id}")
def soft_delete_bubble_tea(bubbletea_id: int) -> dict[str, Any]:
    with conn.cursor() as cur:
        cur.execute("UPDATE bubbletea SET stock = 0 WHERE bubbletea_id = %s", (bubbletea_id,))
        if cur.rowcount == 0:
            return {"ok": False, "result": f"Bubble tea {bubbletea_id} no encontrado"}
    conn.commit()
    return {"ok": True, "result": bubbletea_id}