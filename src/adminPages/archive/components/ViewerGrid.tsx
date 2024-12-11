// ViewerGrid.tsx
import React, { useState } from 'react';
import ViewerFilters from './ViewerFilters';
import ViewerDataProvider from './ViewerDataProvider';
import SendMessageModal from './operation/SendMessageModal';
import ViewerFilterPanel from './ViewerFilterPanel';

interface Filter {
    search: string | null;
    language: string;
    role: string | null;
    exhibitionId: number | null;
    createTime: string | null;
}


const ViewerGrid: React.FC = () => {
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    return (
        <ViewerDataProvider>
            {({ data, loading, options, pagination, filter, setFilter, setPagination }) => (
                <div className="space-y-3">
                    <ViewerFilters
                        filter={filter}
                        options={options}
                        onDateChange={(date) =>
                            setFilter((prev: Filter) => ({ ...prev, createTime: date }))
                        }
                        onExhibitionChange={(value) =>
                            setFilter((prev: Filter) => ({ ...prev, exhibitionId: Number(value) }))
                        }
                        onRoleChange={(value) =>
                            setFilter((prev: Filter) => ({ ...prev, role: value }))
                        }
                    />

                    {selectedUserIds.length > 0 && (
                        <div className="p-3">
                            <SendMessageModal usersId={selectedUserIds} />
                        </div>
                    )}

                    <ViewerFilterPanel
                        data={data}
                        loading={loading}
                        onTableChange={(pagination) => setPagination((prev: any) => ({ ...prev, ...pagination }))}
                        pagination={pagination}
                        selectedUserIds={selectedUserIds}
                        onSelectChange={setSelectedUserIds}
                    />
                </div>
            )}
        </ViewerDataProvider>
    );
};

export default ViewerGrid;
