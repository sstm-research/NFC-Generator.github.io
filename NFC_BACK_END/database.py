import mysql.connector
conn = mysql.connector.connect(
    host ='localhost',
    database ='GERENCIADOR',
    user ='root',
    password ='24042022'
    )

def create_table(pag):
    cursor = conn.cursor()
    sql = (f'CREATE TABLE {pag}(ID smallint primary key auto_increment, links longtext,STATUS text);')
    cursor.execute(sql)   
    conn.commit()
    cursor.close
    
def inserir_links(pag,link):
    cursor = conn.cursor()
    sql = (f'INSERT INTO {pag}(links,STATUS) VALUE("{link}","not acess");')
    cursor.execute(sql)
    conn.commit()
    

def leitura(pag):
    cursor = conn.cursor() 
    sql  = (f"SELECT * FROM {pag};")
    cursor.execute(sql)
    result = cursor.fetchmany(size=200);
    cursor.close
    return result

def update(tabela):
    dados =leitura(tabela)
    cursor = conn.cursor()
    tamanho = len(dados)
    for linha in range(tamanho):
        acesso = dados[linha][2]
        link = dados[linha][1]
        id = dados[linha][0]
        if acesso == 'not acess':
            sql = (f"update {tabela} set status = 'acessado' where ID  = {id};")
            cursor.execute(sql)
            conn.commit()
            cursor.close()        
            return id,tamanho,link 
            break       
        elif id == tamanho:
            sqld = (f"drop table{tabela};")
            cursor.execute(sqld)
            conn.commit()
            cursor.close
            return 'Todos os Links Foram acessados.'
    
    
    
