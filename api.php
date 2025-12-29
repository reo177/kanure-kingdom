<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// データファイルのパス
$dataFile = 'data.json';
$statsFile = 'stats.json';

// アクションの取得
$action = $_GET['action'] ?? '';

try {
    switch ($action) {
        case 'getStats':
            // 統計情報を取得
            $stats = getStats();
            echo json_encode([
                'success' => true,
                'stats' => $stats
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'updateStats':
            // 統計情報を更新
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $event = $input['action'] ?? '';
                
                updateStats($event);
                echo json_encode([
                    'success' => true,
                    'message' => '統計が更新されました'
                ], JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception('POSTメソッドが必要です');
            }
            break;
            
        case 'getData':
            // 全データを取得
            $data = getData();
            echo json_encode([
                'success' => true,
                'data' => $data
            ], JSON_UNESCAPED_UNICODE);
            break;
            
        case 'updateData':
            // データを更新
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                updateData($input['data'] ?? []);
                echo json_encode([
                    'success' => true,
                    'message' => 'データが更新されました'
                ], JSON_UNESCAPED_UNICODE);
            } else {
                throw new Exception('POSTメソッドが必要です');
            }
            break;
            
        default:
            throw new Exception('無効なアクションです');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

/**
 * 統計情報を取得
 */
function getStats() {
    global $statsFile, $dataFile;
    
    // stats.jsonが存在する場合はそれを使用
    if (file_exists($statsFile)) {
        $stats = json_decode(file_get_contents($statsFile), true);
        if ($stats) {
            return $stats;
        }
    }
    
    // 存在しない場合はdata.jsonから取得
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        if ($data && isset($data['stats'])) {
            return $data['stats'];
        }
    }
    
    // デフォルト値
    return [
        'members' => 150,
        'online' => 45,
        'channels' => 12,
        'joinClicks' => 0
    ];
}

/**
 * 統計情報を更新
 */
function updateStats($event) {
    global $statsFile;
    
    $stats = getStats();
    
    switch ($event) {
        case 'join_click':
            $stats['joinClicks'] = ($stats['joinClicks'] ?? 0) + 1;
            break;
        // 他のイベントもここに追加可能
    }
    
    // stats.jsonに保存
    file_put_contents($statsFile, json_encode($stats, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

/**
 * 全データを取得
 */
function getData() {
    global $dataFile;
    
    if (file_exists($dataFile)) {
        return json_decode(file_get_contents($dataFile), true);
    }
    
    return null;
}

/**
 * データを更新
 */
function updateData($newData) {
    global $dataFile;
    
    if (empty($newData)) {
        throw new Exception('データが提供されていません');
    }
    
    // 既存のデータを読み込む
    $existingData = getData();
    if ($existingData) {
        // マージ
        $mergedData = array_merge_recursive($existingData, $newData);
    } else {
        $mergedData = $newData;
    }
    
    // 保存
    file_put_contents($dataFile, json_encode($mergedData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}
?>

